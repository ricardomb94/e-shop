import Order from "../models/orderModels.js";
import asyncHandler from "express-async-handler";

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
    totalPrice
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
      totalPrice
    });
    //once the order is instanciate we can save it in DB
    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  }
});

// @desc   GET order by ID
// @route GET /api/orders/;id
// @ccess Private

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

// @desc   Update order to paid
// @route GET /api/orders/:id/pay
// @ccess Private

const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.update_time,
      email_address: req.body.payer.email_address
    };

    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Votre commande n'a pas abouti");
  }
});

// @desc  Get logged in user orders
// @route GET /api/orders/myorders
// @ccess Private
const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  res.json(orders);
});


// @desc  Get all orders
// @route GET /api/orders
// @ccess Private/Admin
const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ }).populate('user', 'id name');
  res.json(orders);
});

// @desc  Delete order
// @route DELETE /api/orders/:id
// @ccess Private/Admin
const deleteOrder = asyncHandler(async (req, res) => {
  const order = await order.findById(req.params.id);

  if (order) {
    await order.remove();
    res.json({ message: "Commande supprimé avec succès" });
  } else {
    res.status(404);
    throw new Error("Commande non trouvée");
  }
});
export { addOrderItems, getOrderById, updateOrderToPaid, getMyOrders, getOrders, deleteOrder };
