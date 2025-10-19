import { Router } from 'express';
import { validateAsin } from '../utils/validators';
import { fetchProductByAsin } from '../services/amazon.service';
import { extractAsinFromUrl } from '../utils/extractAsin';

const router = Router();

/**
 * POST /api/product
 * body: { url: string }
 * Accepts Amazon product URL, extracts ASIN, and returns product info
 */
router.post('/', async (req, res) => {
  const { url } = req.body as { url?: string };
  if (!url) return res.status(400).json({ error: 'Product URL is required' });
  const asin = extractAsinFromUrl(url);
  if (!asin || !validateAsin(asin)) return res.status(400).json({ error: 'Invalid or missing ASIN in URL' });

  try {
    const product = await fetchProductByAsin(asin);
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json({ product });
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;
