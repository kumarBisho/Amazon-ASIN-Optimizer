

import OpenAI from 'openai';
import { ProductData } from './amazon.service';
import axios from 'axios';

const geminiApiKey = process.env.GEMINI_API_KEY;
const openaiApiKey = process.env.OPENAI_API_KEY;

let client: any = null;
let useGemini = false;
if (geminiApiKey) {
  useGemini = true;
} else if (openaiApiKey) {
  client = new OpenAI({ apiKey: openaiApiKey });
}

export type OptimizedResult = {
  optimizedTitle: string;
  optimizedBullets: string[];
  optimizedDescription: string;
  keywordSuggestions: string[];
};

const buildPrompt = (product: ProductData) => `
You are an Amazon listing expert and SEO copywriter.

Input:
Title: ${product.title}
Bullets:
${(product.bullets || []).map((b, i) => `${i + 1}. ${b}`).join('\n')}
Description: ${product.description || ''}

Task:
1) Produce a single improved, keyword-rich, readable title suitable for Amazon (under 200 characters).
2) Rewrite 4-5 bullet points focusing on key benefits and keywords.
3) Write an enhanced product description (persuasive, accurate, policy-compliant).
4) Generate 3-5 keyword suggestions (short phrases).
Return strict JSON with keys:
{
  "optimizedTitle": "...",
  "optimizedBullets": ["..."],
  "optimizedDescription": "...",
  "keywordSuggestions": ["..."]
}
`;

function extractJson(raw: string) {
  const start = raw.indexOf('{');
  const end = raw.lastIndexOf('}');
  if (start >= 0 && end >= 0) {
    const jsonStr = raw.slice(start, end + 1);
    try {
      return JSON.parse(jsonStr);
    } catch (e) {
      // try loosened parsing
      try {
        // remove trailing commas
        const cleaned = jsonStr.replace(/,\s*}/g, '}').replace(/,\s*]/g, ']');
        return JSON.parse(cleaned);
      } catch (e2) {
        return null;
      }
    }
  }
  return null;
}

export async function optimizeWithAI(product: ProductData): Promise<OptimizedResult> {
  const prompt = buildPrompt(product);
  const model = process.env.AI_MODEL || 'gpt-4o-mini';

  if (useGemini) {
    // Allow model name to be set via .env
    const geminiModel = process.env.GEMINI_MODEL || 'gemini-pro';
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${geminiModel}:generateContent?key=${geminiApiKey}`;
    const body = {
      contents: [{ parts: [{ text: prompt }] }]
    };
    const resp = await axios.post(url, body, { headers: { 'Content-Type': 'application/json' } });
    // Gemini returns candidates[0].content.parts[0].text
    const raw = resp.data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
    const parsed = extractJson(raw);
    if (!parsed) {
      return {
        optimizedTitle: product.title || '',
        optimizedBullets: product.bullets || [],
        optimizedDescription: product.description || '',
        keywordSuggestions: []
      };
    }
    return {
      optimizedTitle: parsed.optimizedTitle || '',
      optimizedBullets: parsed.optimizedBullets || [],
      optimizedDescription: parsed.optimizedDescription || '',
      keywordSuggestions: parsed.keywordSuggestions || []
    };
  } else if (client) {
    // OpenAI fallback
    const resp = await client.chat.completions.create({
      model,
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.2,
      max_tokens: 800
    });
    const raw = resp.choices?.[0]?.message?.content || '';
    const parsed = extractJson(raw);
    if (!parsed) {
      return {
        optimizedTitle: product.title || '',
        optimizedBullets: product.bullets || [],
        optimizedDescription: product.description || '',
        keywordSuggestions: []
      };
    }
    return {
      optimizedTitle: parsed.optimizedTitle || '',
      optimizedBullets: parsed.optimizedBullets || [],
      optimizedDescription: parsed.optimizedDescription || '',
      keywordSuggestions: parsed.keywordSuggestions || []
    };
  } else {
    throw new Error('No AI API key configured');
  }
}
