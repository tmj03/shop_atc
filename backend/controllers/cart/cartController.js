const cartService = require("../../services/cart/cartService");

exports.getCart = async (req, res) => {
    try {
        const cart = await cartService.getCart(req.user.id);
        res.json(cart || { items: [] });
    } catch (err) {
        res.status(500).json({ message: "Lỗi khi lấy giỏ hàng" });
    }
};

exports.addToCart = async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        const cart = await cartService.addToCart(req.user.id, productId, quantity);
        res.json(cart);
    } catch (err) {
        res.status(500).json({ message: "Lỗi khi thêm vào giỏ hàng" });
    }
};

exports.removeCartItem = async (req, res) => {
    try {
        const { productId } = req.params;
        const cart = await cartService.removeFromCart(req.user.id, productId);
        res.json(cart);
    } catch (err) {
        res.status(500).json({ message: "Lỗi khi xóa sản phẩm khỏi giỏ hàng" });
    }
};

exports.clearCart = async (req, res) => {
    try {
        await cartService.clearCart(req.user.id);
        res.json({ message: "Đã xóa toàn bộ giỏ hàng" });
    } catch (err) {
        res.status(500).json({ message: "Lỗi khi xóa giỏ hàng" });
    }
};
