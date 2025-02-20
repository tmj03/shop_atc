const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    discount: { type: Number, default: 0 },
    image: { type: String },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
    quantity: {
        type: Number,
        required: true,
        default: 0
    },
    description: { type: String, required: true},
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Product', ProductSchema);
