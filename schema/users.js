import mongoose from 'mongoose';

const usersSchema = new mongoose.Schema({
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
  phone: {
    type: String,
    trim: true,
  },
  lastName: {
    type: String,
    trim: true,
  },
  firstName: {
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

export default usersSchema;
