const Cart = require("../../models/Cart");
const Product = require("../../models/Product");

const getCart = async (userId) => {
    const cart = await Cart.findOne({ userId }).populate({
        path: "items.productId",
        select: "name price", // ✅ Chỉ lấy name & price để tối ưu hiệu suất
    });

    if (!cart) return { items: [] };

    return {
        items: cart.items.map((item) => ({
            productId: item.productId._id,
            name: item.productId.name,  // ✅ Trả về tên sản phẩm
            price: item.productId.price,
            quantity: item.quantity,
        })),
    };
};

const addToCart = async (userId, productId, quantity = 1) => {
    let cart = await Cart.findOne({ userId });

    if (!cart) {
        cart = new Cart({ userId, items: [] });
    }

    const existingItem = cart.items.find(item => item.productId.toString() === productId);
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.items.push({ productId, quantity });
    }

    await cart.save();
    return cart;
};

const removeFromCart = async (userId, productId) => {
    const cart = await Cart.findOneAndUpdate(
        { userId },
        { $pull: { items: { productId: productId } } }, // ✅ Sửa lỗi `$pull`
        { new: true }
    );

    return getCart(userId); // ✅ Trả về giỏ hàng đã cập nhật
};

const clearCart = async (userId) => {
    return await Cart.findOneAndDelete({ userId });
};

module.exports = { getCart, addToCart, removeFromCart, clearCart };
