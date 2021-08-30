import asyncHandler from 'express-async-handler';
import Product from '../models/productsModel.js';


// @desc Fetch all products
// @route GET /api/products/
// @ccess Public: no token needed
const getProducts = asyncHandler(async (req, res) =>{
    const products = await Product.find({});
    // throw new Error('some error')

    res.json(products);
})

// @desc Fetch single product
// @route GET /api/products/:id
// @ccess Public
const getProductById = asyncHandler(async (req, res) =>{
    const product = await Product.findById(req.params.id);

    if (product) {
      res.json(product);
    } else {
      res.status(404);
      throw new Error('Product not found');
    }
})

// @desc Delete a product
// @route DELETE /api/products/:id
// @ccess Private/Admin
const deleteProduct = asyncHandler(async (req, res) =>{
  const product = await Product.findById(req.params.id);

  if (product) {
    await product.remove();
    res.json({message: 'Produit supprimé avec succès'});
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
})

export {
    getProducts,
    getProductById,
    deleteProduct
}