const cartService = require("../../services/cart/cartService");

exports.getCart = async (req, res) => {
    try {
        const cart = await cartService.getCart(req.user.id);
        res.json(cart || { items: [], totalAmount: 0 }); // ✅ Đảm bảo tổng tiền luôn được trả về
    } catch (err) {
        res.status(500).json({ message: "Lỗi khi lấy giỏ hàng", error: err.message });
    }
};

exports.addToCart = async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        const cart = await cartService.addToCart(req.user.id, productId, quantity);
        res.json(cart); // ✅ Đã có totalAmount trong response từ service
    } catch (err) {
        res.status(500).json({ message: "Lỗi khi thêm vào giỏ hàng", error: err.message });
    }
};

exports.removeCartItem = async (req, res) => {
    try {
        const { productId } = req.params;
        const cart = await cartService.removeFromCart(req.user.id, productId);
        res.json(cart); // ✅ Đã có totalAmount sau khi cập nhật
    } catch (err) {
        res.status(500).json({ message: "Lỗi khi xóa sản phẩm khỏi giỏ hàng", error: err.message });
    }
};

exports.clearCart = async (req, res) => {
    try {
        const cart = await cartService.clearCart(req.user.id);
        res.json(cart); // ✅ Giỏ hàng rỗng với totalAmount = 0
    } catch (err) {
        res.status(500).json({ message: "Lỗi khi xóa giỏ hàng", error: err.message });
    }
};
