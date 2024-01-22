const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter your name'],
    },
    email: {
        type: String,
        required: [true, 'Please enter email'],
        unique: true
    },
    password: {
        type: String,
        minLength: [8, "password cannot be less than 8 characters"],
        required: [true, 'Please enter password']
    },
    role: {
        type: String,
        required: [true, 'Please enter role'],
        enum: ['farmer', 'user'],
    },
    products: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product', 
        }
    ]
});

module.exports = mongoose.model('User', userSchema);
