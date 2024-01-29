const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    farmer_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    product_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },

    status: {
        type: String,
        default: 'pending',
        required: [true, 'Please enter status'],
        enum: ['pending', 'delivered'],
    }


});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
