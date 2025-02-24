const Cart = require("../../models/Cart");
const Product = require("../../models/Product");

const getCart = async (userId) => {
    const cart = await Cart.findOne({ userId }).populate({
        path: "items.productId",
        select: "name price image",
    });

    if (!cart) return { items: [], totalAmount: 0 };

    return {
        items: cart.items.map((item) => ({
            productId: item.productId._id,
            name: item.productId.name,
            price: item.productId.price,
            image: item.productId.image || "/default-image.jpg",
            quantity: item.quantity,
        })),
        totalAmount: cart.totalAmount, // ✅ Thêm tổng tiền vào response
    };
};

const addToCart = async (userId, productId, quantity = 1) => {
    let cart = await Cart.findOne({ userId });

    if (!cart) {
        cart = new Cart({ userId, items: [] });
    }

    const product = await Product.findById(productId);
    if (!product) throw new Error("Sản phẩm không tồn tại");

    // Kiểm tra xem sản phẩm đã có trong giỏ hàng chưa
    const existingItem = cart.items.find((item) => item.productId.toString() === productId);
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.items.push({ productId, quantity });
    }

    await cart.save();
    return getCart(userId); // ✅ Trả về giỏ hàng đã cập nhật, bao gồm tổng tiền
};

const removeFromCart = async (userId, productId) => {
    const cart = await Cart.findOneAndUpdate(
        { userId },
        { $pull: { items: { productId } } },
        { new: true }
    );

    return getCart(userId);
};

const clearCart = async (userId) => {
    await Cart.findOneAndDelete({ userId });
    return { items: [], totalAmount: 0 }; // ✅ Trả về giỏ hàng trống sau khi xóa
};

module.exports = { getCart, addToCart, removeFromCart, clearCart };
