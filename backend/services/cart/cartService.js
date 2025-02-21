const Cart = require("../../models/Cart");
const Product = require("../../models/Product");

const getCart = async (userId) => {
    const cart = await Cart.findOne({ userId }).populate({
        path: "items.productId",
        select: "name price image", // ✅ Lấy thêm trường "image"
    });

    if (!cart) return { items: [] };

    // Kiểm tra và trả về giỏ hàng với đầy đủ thông tin
    return {
        items: cart.items.map((item) => ({
            productId: item.productId._id,
            name: item.productId.name,  
            price: item.productId.price,
            image: item.productId.image || '/default-image.jpg', // ✅ Kiểm tra trường image, nếu không có thì dùng ảnh mặc định
            quantity: item.quantity,
        })),
    };
};

const addToCart = async (userId, productId, quantity = 1) => {
    let cart = await Cart.findOne({ userId });

    if (!cart) {
        cart = new Cart({ userId, items: [] });
    }

    // Kiểm tra xem sản phẩm đã có trong giỏ hàng chưa
    const existingItem = cart.items.find(item => item.productId.toString() === productId);
    if (existingItem) {
        // Nếu đã có thì tăng số lượng
        existingItem.quantity += quantity;
    } else {
        // Nếu chưa có, thêm sản phẩm mới vào giỏ
        cart.items.push({ productId, quantity });
    }

    await cart.save();  // Lưu giỏ hàng sau khi thay đổi
    return cart;        // Trả về giỏ hàng đã cập nhật
};

const removeFromCart = async (userId, productId) => {
    const cart = await Cart.findOneAndUpdate(
        { userId },
        { $pull: { items: { productId: productId } } }, // ✅ Sử dụng $pull để xóa item
        { new: true }
    );

    // Trả về giỏ hàng đã được cập nhật sau khi xóa
    return getCart(userId); 
};

const clearCart = async (userId) => {
    return await Cart.findOneAndDelete({ userId });
};

module.exports = { getCart, addToCart, removeFromCart, clearCart };
