const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        items: [
            {
                productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
                quantity: { type: Number, required: true, default: 1 },
            },
        ],
        totalAmount: { type: Number, default: 0 }, // ✅ Thêm tổng tiền
    },
    { timestamps: true }
);

// Middleware tự động tính tổng tiền trước khi lưu
CartSchema.pre("save", async function (next) {
    const cart = this;
    if (cart.items.length === 0) {
        cart.totalAmount = 0;
        return next();
    }

    try {
        const productIds = cart.items.map((item) => item.productId);
        const products = await mongoose.model("Product").find({ _id: { $in: productIds } });

        cart.totalAmount = cart.items.reduce((sum, item) => {
            const product = products.find((p) => p._id.toString() === item.productId.toString());
            return sum + (product ? product.price * item.quantity : 0);
        }, 0);

        next();
    } catch (error) {
        next(error);
    }
});

module.exports = mongoose.model("Cart", CartSchema);
