

import axios from 'axios';
import cheerio from 'cheerio';

export type ProductData = {
  asin: string;
  title: string;
  bullets: string[];
  description?: string;
};

// Fetch from Rainforest API if key present, else optionally scrape.
async function fetchFromRainforest(asin: string): Promise<ProductData | null> {
  const key = process.env.RAINFOREST_API_KEY;
  if (!key) return null;

  const url = `https://api.rainforestapi.com/request?api_key=${key}&type=product&amazon_domain=amazon.in&asin=${asin}`;

  try {
    const r = await axios.get(url, { timeout: 10000 });
    console.log("Rainforest API response status:", r.status);

    const p = r.data?.product;
    if (!p) {
      console.warn("No product returned for ASIN:", asin, r.data);
      return null;
    }

    console.log("Rainforest product title:", p.title);

    return {
      asin,
      title: p.title || '',
      bullets: p.bullet_points || p.bullets || [],
      description: p.description || p.product_description || ''
    };
  } catch (err: any) {
    console.error("Rainforest API fetch error for ASIN:", asin, err.message);
    return null;
  }
}

async function scrapeAmazon(asin: string): Promise<ProductData | null> {
  const url = `https://www.amazon.in/dp/${asin}`;
  const r = await axios.get(url, {
    headers: { 'User-Agent': 'Mozilla/5.0 (compatible; SalesDuoBot/1.0)' },
    timeout: 10000
  });
  const $ = cheerio.load(r.data);
  const title = $('#productTitle').text().trim() || $('h1 span#title').text().trim();
  const bullets: string[] = [];
  $('#feature-bullets ul li, #feature-bullets li').each((_, el) => {
    const t = $(el).text().replace(/\s+/g, ' ').trim();
    if (t) bullets.push(t);
  });
  const description = $('#productDescription').text().trim() || $('div#description').text().trim();
  return { asin, title: title || '', bullets, description: description || '' };
}

export async function fetchProductByAsin(asin: string): Promise<ProductData | null> {
  const useScrape = process.env.USE_SCRAPE === 'true';
  try {
    if (!useScrape) {
      const rf = await fetchFromRainforest(asin);
      if (rf) return rf;
    }
    return await scrapeAmazon(asin);
  } catch (err) {
    // Log and return null
    console.error('fetchProductByAsin error', err);
    return null;
  }
}
