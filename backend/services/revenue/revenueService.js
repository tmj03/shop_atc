const Revenue = require("../../models/Revenue");
const Order = require("../../models/Order");

const calculateRevenue = async (filterType) => {
    let startDate, endDate;
    const today = new Date();

    if (filterType === "day") {
        startDate = new Date(today.setHours(0, 0, 0, 0));
        endDate = new Date(today.setHours(23, 59, 59, 999));
    } else if (filterType === "month") {
        startDate = new Date(today.getFullYear(), today.getMonth(), 1);
        endDate = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    } else if (filterType === "year") {
        startDate = new Date(today.getFullYear(), 0, 1);
        endDate = new Date(today.getFullYear(), 11, 31);
    } else {
        throw new Error("Invalid filter type");
    }

    const totalRevenue = await Revenue.aggregate([
        { $match: { date: { $gte: startDate, $lte: endDate } } },
        { $group: { _id: null, total: { $sum: "$totalRevenue" } } }
    ]);

    return totalRevenue.length > 0 ? totalRevenue[0].total : 0;
};

const getDeliveredOrders = async (filterType) => {
    let startDate, endDate;
    const today = new Date();

    if (filterType === "day") {
        startDate = new Date(today.setHours(0, 0, 0, 0));
        endDate = new Date(today.setHours(23, 59, 59, 999));
    } else if (filterType === "month") {
        startDate = new Date(today.getFullYear(), today.getMonth(), 1);
        endDate = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    } else if (filterType === "year") {
        startDate = new Date(today.getFullYear(), 0, 1);
        endDate = new Date(today.getFullYear(), 11, 31);
    } else {
        throw new Error("Invalid filter type");
    }

    return await Order.find({ status: "delivered", createdAt: { $gte: startDate, $lte: endDate } })
        .populate("items.productId userId");
};


module.exports = { calculateRevenue, getDeliveredOrders };
