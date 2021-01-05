import express from 'express';
import asyncHandler from 'express-async-handler';
import Product from '../models/productsModel.js';

const router = express.Router();

// @desc Fetch all products
// @route GET /api/products/
// @ccess Public: no token needed

router.get(
  '/',
  asyncHandler(async (req, res) => {
    const product = await Product.find({});
    res.json(product);
  })
);

// @desc Fetch single product
// @route GET /api/products/:id
// @ccess Public: no token needed
router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    //   const product = products.find((p) => p._id === req.params.id);
    const product = await Product.findById(req.params.id);

    if (product) {
      res.json(product);
    } else {
      res.status(404);
      throw new Error('Product not found');
    }
  })
);

export default router;
