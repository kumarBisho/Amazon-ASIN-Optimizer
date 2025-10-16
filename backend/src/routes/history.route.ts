import { Router } from 'express';
import { prisma } from '../services/db.service';
import { validateAsin } from '../utils/validators';

const router = Router();

/**
 * GET /api/history/:asin
 * returns optimization records for ASIN ordered by createdAt desc
 */
router.get('/:asin', async (req, res) => {
  const asin = req.params.asin;
  if (!validateAsin(asin)) return res.status(400).json({ error: 'Invalid ASIN' });

  try {
    const rows = await prisma.optimization.findMany({
      where: { asin },
      orderBy: { createdAt: 'desc' }
    });
    // map parse JSON fields
    const mapped = rows.map(r => ({
      id: r.id,
      asin: r.asin,
      optimizedTitle: r.optimizedTitle,
      optimizedBullets: JSON.parse(r.optimizedBullets || '[]'),
      keywordsSuggestions: JSON.parse(r.keywordsSuggestions || '[]'),
      createdAt: r.createdAt
    }));
    res.json(mapped);
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;
