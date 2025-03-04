const Order = require("../../models/Order");
const Cart = require("../../models/Cart");
const Revenue = require("../../models/Revenue");

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
    const order = await Order.findById(orderId);
    if (!order) throw new Error("Không tìm thấy đơn hàng!");

    // Nếu đơn hàng đã được giao thì không thể cập nhật trạng thái nữa
    if (order.status === "delivered") {
        throw new Error("Không thể cập nhật trạng thái của đơn hàng đã giao!");
    }

    order.status = status;
    await order.save();

    // Cập nhật doanh thu nếu đơn hàng được chuyển sang trạng thái "delivered"
    if (status === "delivered") {
        const todayStart = new Date();
        todayStart.setHours(0, 0, 0, 0);

        const todayEnd = new Date();
        todayEnd.setHours(23, 59, 59, 999);

        let revenue = await Revenue.findOne({ date: { $gte: todayStart, $lte: todayEnd } });

        if (revenue) {
            revenue.totalRevenue += order.totalPrice;
            await revenue.save();
        } else {
            revenue = new Revenue({ date: todayStart, totalRevenue: order.totalPrice });
            await revenue.save();
        }
    }

    return order;
};


const getOrderById = async (orderId) => {
    return await Order.findById(orderId).populate("items.productId userId");
};

module.exports = { placeOrder, getOrdersByUser, getAllOrders, updateOrderStatus, getOrderById };
