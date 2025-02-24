const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    fullName: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    items: [{
        productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
        quantity: { type: Number, required: true }
    }],
    totalPrice: { type: Number, required: true },
    status: { type: String, enum: ["pending", "confirmed", "shipped", "delivered", "canceled"], default: "pending" }
}, { timestamps: true });

module.exports = mongoose.model("Order", OrderSchema);
