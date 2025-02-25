const orderService = require("../../services/order/orderService");

exports.placeOrder = async (req, res) => {
    try {
        const { fullName, phone, address } = req.body;
        const order = await orderService.placeOrder(req.user.id, fullName, phone, address);
        res.status(201).json(order);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getOrdersByUser = async (req, res) => {
    try {
        const orders = await orderService.getOrdersByUser(req.user.id);
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getAllOrders = async (req, res) => {
    try {
        const orders = await orderService.getAllOrders();
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateOrderStatus = async (req, res) => {
    try {
        const { orderId } = req.params;
        const { status } = req.body;
        const order = await orderService.updateOrderStatus(orderId, status);
        res.json(order);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};



exports.getOrderById = async (req, res) => {
    try {
        const { orderId } = req.params;
        const order = await orderService.getOrderById(orderId);
        if (!order) {
            return res.status(404).json({ message: "Không tìm thấy đơn hàng!" });
        }
        res.json(order);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};