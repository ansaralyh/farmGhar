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
        minLength: [8, "Password cannot be less than 8 characters"],
        required: [true, 'Please enter password']
    },
    role: {
        type: String,
        required: [true, 'Please enter role'],
        enum: ['farmer', 'user'],
    },
   
});

module.exports = mongoose.model('User', userSchema);
