const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    userId: { type: String, require: true },
    customerId: { type: String, require: true },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
    },
    quantity: { type: Number, require: true },
    subtotal: { type: Number, require: true },
    delivery_status: { type: String, require: true, default: "pending" },
    payment_status: { type: String, require: true },
    total: { type: Number, require: true },
}, { timestamps: true });

const Order = mongoose.model('Order', OrderSchema);

module.exports = Order;