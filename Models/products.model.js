const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    
    name: {
        type: String,
        required: [true, 'Please enter the product name'],
    },
    description: {
        type: String,
        required: [true, 'Please enter the product description'],
    },
    price: {
        type: Number,
        required: [true, 'Please enter the product price'],
    },
    place: {
        type: String,
        required: [true, 'Please enter the product place'],
    },
    category: {
        type: String,
        required: [true, 'Please enter the product category'],
        enum: ['cows', 'sheeps', 'goat', 'donkey', 'horse'],
    },
    isSold:{
        type:Boolean,
        default:false
    },
    image:{
        type:Buffer,
    }
});

module.exports = mongoose.model('Product', productSchema);
