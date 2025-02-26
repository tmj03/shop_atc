const { calculateRevenue, getDeliveredOrders } = require("../../services/revenue/revenueService");

const fetchRevenue = async (req, res) => {
    try {
        const { filterType } = req.query;
        if (!filterType) {
            return res.status(400).json({ message: "Missing filterType query parameter" });
        }

        const totalRevenue = await calculateRevenue(filterType);
        const deliveredOrders = await getDeliveredOrders(filterType);

        res.json({ totalRevenue, deliveredOrders });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



module.exports = { fetchRevenue };
