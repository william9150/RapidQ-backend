const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Please enter your email.'],
        unique: true,
        lowercase: true,
        select: false,
        trim: true,
    },
    googleId: {
        type: String,
        default: '',
    },
    password: {
        type: String,
        minlength: 8,
        select: false,
        trim: true,
    },
    firstName: {
        type: String,
        trim: true,
    },
    lastName: {
        type: String,
        trim: true,
    },
    phone: {
        type: String,
        trim: true,
    },
    avatarPath: {
        type: String,
        trim: true,
    },
    nickname: {
        type: String,
        trim: true,
    },

    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
