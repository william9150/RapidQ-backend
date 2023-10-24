import mongoose from 'mongoose';
import reposSchema from '../schema/repos.js';
import { questionSchema, optionSchema } from '../schema/repos.js';

const reposModel = mongoose.model('repos', reposSchema);

// 新增的驗證和清理函數
reposModel.validateAndCleanQuestionData = function (questionData) {
  // 檢查必要的欄位
  if (!questionData.type || !questionData.title || !questionData.options || !questionData.answer) {
    return {
      result: false,
      message: '資料不完整',
    };
  }

  // 檢查type欄位
  if (!['Single', 'Multi'].includes(questionData.type)) {
    return {
      result: false,
      message: 'type欄位的值不正確',
    };
  }

  // 檢查title欄位
  if (questionData.title.trim() === '') {
    return {
      result: false,
      message: 'title欄位不可以是空值',
    };
  }

  // 檢查answer欄位
  if (!Array.isArray(questionData.answer) || !questionData.answer.every(item => typeof item === 'number')) {
    return {
      result: false,
      message: 'answer欄位必須是數字陣列',
    };
  }

  //options至少要有兩個選項
  if (questionData.options.length < 2) {
    return {
      result: false,
      message: 'options至少要有兩個選項',
    };
  }

  // 檢查options的idx是否重複
  const idxSet = new Set(questionData.options.map(opt => opt.idx));
  if (idxSet.size !== questionData.options.length) {
    return {
      result: false,
      message: 'options的idx不可以重複',
    };
  }

  // 檢查options的desc或imgUrl兩個欄位不可以同時為空
  for (let opt of questionData.options) {
    if ((!opt.desc || opt.desc.trim() === '') && (!opt.imgUrl || opt.imgUrl.trim() === '')) {
      return {
        result: false,
        message: 'options的desc或imgUrl兩個欄位不可以同時為空',
      };
    }
  }

  // 如果是Single，answer的長度必須是1
  if (questionData.type === 'Single' && questionData.answer.length !== 1) {
    return {
      result: false,
      message: 'Single題的answer長度必須是1',
    };
  }

  // 檢查answer的值是否在options的idx範圍內
  for (let ans of questionData.answer) {
    if (!idxSet.has(ans)) {
      return {
        result: false,
        message: 'answer的值必須在options的idx範圍內',
      };
    }
  }

  // 清理資料
  return {
    result: true,
    data: {
      type: questionData.type,
      title: questionData.title.trim(),
      imgUrl: questionData.imgUrl ? questionData.imgUrl.trim() : null,
      options: questionData.options.map(opt => ({
        idx: opt.idx,
        desc: opt.desc ? opt.desc.trim() : null,
        imgUrl: opt.imgUrl ? opt.imgUrl.trim() : null,
      })),
      answer: questionData.answer,
    },
  };
};

export default reposModel;
