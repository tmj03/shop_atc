const express = require("express");
const router = express.Router();
const cartController = require("../../controllers/cart/cartController");
const authMiddleware = require("../../middleware/authMiddleware");

router.get("/cart", authMiddleware, cartController.getCart);
router.post("/cart", authMiddleware, cartController.addToCart);
router.delete("/cart/:productId", authMiddleware, cartController.removeCartItem);
router.delete("/cart", authMiddleware, cartController.clearCart);

module.exports = router;
