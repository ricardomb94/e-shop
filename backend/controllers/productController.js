import Product from '../models/productsModel.js';
import asyncHandler from 'express-async-handler';

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

// @desc Create a product
// @route POST /api/products
// @ccess Private/Admin
const createProduct = asyncHandler(async (req, res) =>{
  /**
   * Let's instanciate a new project
   */
  const product = new Product({
    name: 'sample name',
    price: 0,
    user: req.user._id,
    image: '/images/sample.jpg',
    category: 'category',
    brand: 'sample brand',
    countInStock: 0,
    numReviews: 0,
    description: 'sample description'
  })
/**
 * We save the instanciated product in the database
 * and respond with 201 status and send the created product in json format
 */
  const createdProduct = await product.save()
  res.status(201).json(createdProduct)
})


// @desc Update a product
// @route PUT /api/products/:id
// @ccess Private/Admin
const updateProduct = asyncHandler(async (req, res) =>{
  /**
   * Let's get from the body request object all necessary info
   */
  const {
    name,
    price,
    description,
    image,
    brand,
    category,
    countInStock
  } = req.body;

  const product = await  Product.findById(req.params.id)

  if(product){
    //Let's set all the product properties in the body
    product.name = name
    product.price = price
    product.description = description
    product.image = image
    product.brand = brand
    product.category = category
    product.countInStock = countInStock

  /**
   * We save the updated product in the database
   * and respond with 201 status and send the updated product in json format
  */
    const updatedProduct = await product.save()
    res.status(201).json(updatedProduct)
  }else{
    res.status(404)
    throw new Error('Produit non trouvé')
  }

})

export {
    getProducts,
    getProductById,
    deleteProduct,
    createProduct,
    updateProduct,
}