import Product from '../models/productsModel.js';
import asyncHandler from 'express-async-handler';

// @desc Fetch all products
// @route GET /api/products/
// @ccess Public: no token needed
const getProducts = asyncHandler(async (req, res) =>{

  const pageSize = 6
  const page = Number( req.query.pageNumber ) || 1

  const keyword = req.query.keyword ? {
    name: {
      $regex: req.query.keyword,
      $options: 'i'
    }
  } : {}

  const count = await Product.countDocuments( { ...keyword } )
  const products = await Product
    .find( { ...keyword } ).limit( pageSize )
    .skip( pageSize * ( page - 1 ) );


  res.json( { products, page, pages: Math.ceil( count / pageSize ) } );
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

// @desc Create a new review
// @route POST /api/products/:id/review
// @ccess Private
const createProductReview = asyncHandler( async ( req, res ) => {
  /**
   * Let's get from the body request object all necessary info
   */
  const {
    rating, comment
  } = req.body;

  const product = await Product.findById( req.params.id )

  if ( product ) {
    //Let's set all the product properties in the body
    //if the product exist, we can check to see if the user have already submitted a review.
    const alreadyReviewed = product.reviews.find( r => r.user.toString() === req.user._id.toString() )

    if ( alreadyReviewed ) {
      res.status( 400 )
      throw new Error( 'Product already reviewed' )
    }

    //construction of review object
    const review = {
      name: req.user.name,
      rating: Number( rating ),
      comment,
      user: req.user._id,
    }
    product.reviews.push( review )
    product.numReviews = product.reviews.length

    product.rating =
      product.reviews.reduce( ( acc, item ) => item.rating + acc, 0 / product.reviews.length )

    await product.save()
    res.status( 201 ).json( { message: 'Review added' } )
  } else {
    res.status( 404 )
    throw new Error( 'Produit non trouvé' )
  }

} )
// @desc Get top rated products
// @route GET /api/products/top
// @ccess Private
const getTopProducts = asyncHandler( async ( req, res ) => {
  const products = await Product.find( {} ).sort( { rating: -1 } ).limit( 3 )
  res.json( products )
} )

export {
    getProducts,
    getProductById,
    deleteProduct,
    createProduct,
    updateProduct,
  createProductReview,
  getTopProducts,
}