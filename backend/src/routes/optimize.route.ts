import { Router } from 'express';
import { validateAsin } from '../utils/validators';
import { fetchProductByAsin } from '../services/amazon.service';
import { optimizeWithAI } from '../services/ai.service';
import { prisma } from '../services/db.service';
import { logger } from '../utils/logger';

const router = Router();

/**
 * POST /api/optimize
 * body: { asin: string }
 */
router.post('/', async (req, res) => {
  const { asin } = req.body as { asin?: string };
  if (!validateAsin(asin)) return res.status(400).json({ error: 'Invalid ASIN' });

  try {
    const product = await fetchProductByAsin(asin!);
    if (!product) return res.status(404).json({ error: 'Product not found' });

    const optimized = await optimizeWithAI(product);

    const saved = await prisma.optimization.create({
      data: {
        asin: asin!,
        originalTitle: product.title,
        optimizedTitle: optimized.optimizedTitle,
        originalBullets: JSON.stringify(product.bullets || []),
        optimizedBullets: JSON.stringify(optimized.optimizedBullets || []),
        originalDescription: product.description || '',
        optimizedDescription: optimized.optimizedDescription || '',
        keywordsSuggestions: JSON.stringify(optimized.keywordSuggestions || [])
      }
    });

    res.json({
      id: saved.id,
      asin: saved.asin,
      original: product,
      optimized,
      createdAt: saved.createdAt
    });
  } catch (err) {
    logger.error('optimize error', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;
