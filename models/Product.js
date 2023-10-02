const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name: { type: String, required: true },
    title: { type: String, required: true },
    category: { type: String, required: true },
    imageUrl: { type: [String], required: true },
    oldPrice: { type: String, required: true },
    sizes: {
        type: [
            {
                size: { type: String, required: true },
                isSelected: { type: Boolean, required: false, default: false }
            }
        ],
    },

    price: { type: String, required: true },
    description: { type: String, required: true },
}, { timestamps: true });

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;