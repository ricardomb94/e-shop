import asyncHandler from "express-async-handler";
import Order from "../models/orderModels.js";

// @desc Fetch Create new order
// @route GET /api/orders/
// @ccess Private

//To create a new order, we gonna get some informations from the body
const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    ItemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  //Let's make sure that the order is not empty
  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("Votre commande est vide");
    return;
  } else {
    //If the order item exist we can instanciate a new order
    const order = new Order({
      orderItems,
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      ItemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });
    //once the order is instanciate we can save it in DB
    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  }
});

// @desc   GET order by ID
// @route GET /api/orders/;id
// @ccess Private

//To create a new order, we gonna get some informations from the body
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );
  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error("Votre commande n'a pas abouti");
  }
});

export { addOrderItems, getOrderById };
