import mongoose from 'mongoose';

const optionSchema = new mongoose.Schema(
  {
    idx: {
      type: Number,
    },
    desc: {
      type: String,
    },
    imgUrl: {
      type: String,
    },
  },
  { _id: false }
); // 設定不生成_id

const questionSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['Single', 'Multi'],
  },
  title: {
    type: String,
  },
  imgUrl: {
    type: String,
  },
  options: [optionSchema],
  answer: {
    type: [Number],
  },
});

const reposSchema = new mongoose.Schema({
  repoName: {
    type: String,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
  },
  questions: [questionSchema],
  isDelete: {
    type: Boolean,
    default: false,
  },
  isPublic: {
    type: Boolean,
    default: true,
  },
  createAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
  },
});

export default reposSchema;
