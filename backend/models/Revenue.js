const mongoose = require("mongoose");

const RevenueSchema = new mongoose.Schema({
    date: { type: Date, required: true, unique: true },
    totalRevenue: { type: Number, default: 0 }
});

module.exports = mongoose.model("Revenue", RevenueSchema);
