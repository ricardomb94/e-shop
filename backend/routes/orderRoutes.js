import {
  addOrderItems,
  deleteOrder,
  getMyOrders,
  getOrderById,
  getOrders,
  updateOrderToDelivered,
  updateOrderToPaid,
} from "../controllers/orderController.js";
import { admin, protect } from "../middleware/authMiddleware.js";

import express from "express";

const router = express.Router();

router.route("/").post(protect, addOrderItems).get(protect, admin, getOrders);
router.route("/myorders").get(protect, getMyOrders);
router.route("/:id").get(protect, getOrderById).delete(protect, admin, deleteOrder);
router.route( "/:id/pay" ).put( protect, updateOrderToPaid );
router.route( "/:id/deliver/" ).put( protect, admin, updateOrderToDelivered );

export default router;
