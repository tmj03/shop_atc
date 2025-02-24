const Order = require("../../models/Order");
const Cart = require("../../models/Cart");

const placeOrder = async (userId, fullName, phone, address) => {
    const cart = await Cart.findOne({ userId }).populate("items.productId");
    if (!cart || cart.items.length === 0) {
        throw new Error("Giỏ hàng trống!");
    }

    const totalPrice = cart.items.reduce((total, item) => total + (item.productId.price * item.quantity), 0);

    const newOrder = new Order({
        userId,
        fullName,
        phone,
        address,
        items: cart.items.map(item => ({
            productId: item.productId._id,
            quantity: item.quantity
        })),
        totalPrice
    });

    await newOrder.save();
    await Cart.findOneAndDelete({ userId });

    return newOrder;
};

const getOrdersByUser = async (userId) => {
    return await Order.find({ userId }).populate("items.productId");
};

const getAllOrders = async () => {
    return await Order.find().populate("items.productId userId");
};

const updateOrderStatus = async (orderId, status) => {
    return await Order.findByIdAndUpdate(orderId, { status }, { new: true });
};

module.exports = { placeOrder, getOrdersByUser, getAllOrders, updateOrderStatus };
