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

const reposSchema = new mongoose.Schema(
  {
    repoName: {
      type: String,
      default: '未命名題庫',
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
  },
  { timestamps: true }
);

export default reposSchema;
export { questionSchema, optionSchema };
