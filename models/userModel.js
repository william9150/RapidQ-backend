const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    thirdPartyId: {
        type: String,
        default: '',
    },
    email: {
        type: String,
        required: [true, 'Please enter your email.'],
        unique: true,
        lowercase: true,
        select: false,
        trim: true,
    },
    password: {
        type: String,
        minlength: 8,
        select: false,
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
    status: {
        type: Boolean,
        default: true,
    },
    lastLoginAt: {
        type: Date,
        default: Date.now,
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
