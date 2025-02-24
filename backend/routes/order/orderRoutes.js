const express = require("express");
const router = express.Router();
const orderController = require("../../controllers/order/orderController");
const authMiddleware = require("../../middleware/authMiddleware");

router.post("/orders", authMiddleware, orderController.placeOrder);
router.get("/orders", authMiddleware, orderController.getOrdersByUser);
router.get("/admin/orders", authMiddleware, orderController.getAllOrders);
router.patch("/orders/:orderId/status", authMiddleware, orderController.updateOrderStatus);

module.exports = router;
