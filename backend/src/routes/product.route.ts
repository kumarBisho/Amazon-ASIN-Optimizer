import { Router } from 'express';
import { validateAsin } from '../utils/validators';
import { fetchProductByAsin } from '../services/amazon.service';

const router = Router();

/**
 * GET /api/product/:asin
 * returns the latest fetched product info (not AI optimized unless previously saved)
 */
router.get('/:asin', async (req, res) => {
  const asin = req.params.asin;
  if (!validateAsin(asin)) return res.status(400).json({ error: 'Invalid ASIN' });

  try {
    const product = await fetchProductByAsin(asin);
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json({ product });
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;
