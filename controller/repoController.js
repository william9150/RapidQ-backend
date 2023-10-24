import reposModel from '../models/reposModel.js';
import { questionSchema, optionSchema } from '../schema/repos.js';
import { appError, handleErrorAsync } from '../utils/errorHandler.js';
import getHttpResponse from '../utils/successHandler.js';
import mongoose from 'mongoose';

const reposController = {
  //Repo-01-01:取得所有repo
  getAll: handleErrorAsync(async (request, response, next) => {
    const repos = await reposModel.find({ $or: [{ userId: request.user._id }, { isPublic: true }] }, { questions: 0 });
    response.status(200).json(
      getHttpResponse({
        data: repos,
      })
    );
  }),
  //Repo-01-02:取得指定的repo
  getOne: handleErrorAsync(async (request, response, next) => {
    const repoId = request.params.repoId;
    if (!repoId) {
      return response.status(400).json({ message: '未提供repoId' });
    }
    const repo = await reposModel.findById(repoId);
    response.status(200).json(
      getHttpResponse({
        data: repo,
      })
    );
  }),
  //Repo-01-03:建立一個新的repo
  createRepo: handleErrorAsync(async (request, response, next) => {
    const newRepo = new reposModel({
      repoName: request.body.repoName || '未命名題庫',
      userId: request.user._id,
      isPublic: request.body.isPublic || true,
    });
    newRepo.save((error, repo) => {
      if (error) {
        return next(error);
      }
      response.status(200).json(
        getHttpResponse({
          data: repo,
        })
      );
    });
  }),
  //Repo-01-04:複製指定的repo
  cloneRepo: handleErrorAsync(async (request, response, next) => {
    const repoId = request.params.repoId;
    const oldRepo = await reposModel.findById(repoId);
    if (!oldRepo) {
      return response.status(404).json({ message: 'Repo not found' });
    }
    const newRepo = new reposModel(oldRepo.toObject());
    newRepo._id = mongoose.Types.ObjectId();
    newRepo.isDelete = false;
    newRepo.repoName = `${oldRepo.repoName}的副本`;
    const savedRepo = await newRepo.save();
    console.log('check point', savedRepo);
    response.status(200).json(
      getHttpResponse({
        data: savedRepo,
      })
    );
  }),
  //Repo-01-05:刪除指定的repo
  deleteRepo: handleErrorAsync(async (request, response, next) => {
    const repoId = request.params.repoId;
    if (!repoId) {
      return response.status(400).json({ message: '未提供repoId' });
    }
    const repo = await reposModel.findOneAndUpdate(
      { _id: request.params.repoId }, //查詢條件
      { isDelete: true }, // 更新內容
      { new: true } // 回傳更新後的資料
    );
    if (!repo) {
      return response.status(404).json({ message: 'Repo not found' });
    }
    response.json(repo);
  }),
  //Repo-01-06:更新指定的repo(題庫名稱與狀態)
  updateRepo: handleErrorAsync(async (request, response, next) => {
    const repoId = request.params.repoId;
    if (!repoId) {
      return response.status(400).json({ message: '未提供repoId' });
    }
    const { repoName, isPublic } = request.body;
    if (repoName === undefined && isPublic === undefined) {
      return response.status(400).json({ message: '未提供repoName或isPublic' });
    }
    let updateObj = {};
    if (repoName !== undefined) {
      updateObj.repoName = repoName;
    }
    if (isPublic !== undefined) {
      updateObj.isPublic = isPublic;
    }
    const updatedRepo = await reposModel.findOneAndUpdate(
      { _id: repoId },
      updateObj,
      { new: true } // returns the updated document
    );
    if (!updatedRepo) {
      return response.status(404).json({ message: 'Repo not found' });
    }
    response.json(updatedRepo);
  }),

  //Repo-01-07:在指定的repo中新增題目(需要產生題目id)
  addQuestion: handleErrorAsync(async (request, response, next) => {
    const repoId = request.params.repoId;
    const questionData = request.body;

    const validResult = reposModel.validateAndCleanQuestionData(questionData);
    if (validResult.result === false) {
      return response.status(400).json({ message: validResult.message });
    }
    const newQuestion = validResult.data;
    // 將新的問題添加到指定的repo
    const repo = await reposModel.findOneAndUpdate(
      { _id: repoId },
      { $push: { questions: newQuestion } },
      { new: true }
    );
    if (!repo) {
      return response.status(404).json({ message: 'Repo not found' });
    }

    response.json({
      status: 'success',
      data: {
        repo,
      },
    });
  }),
  //Repo-01-08:在指定的repo中修改指定的題目內容
  updateQuestion: handleErrorAsync(async (request, response, next) => {
    const repoId = request.params.repoId;
    const questionId = request.params.questionId;
    const questionData = request.body;

    // 使用 reposModel 的 validateAndCleanQuestionData 函數進行資料驗證和清理
    const validResult = reposModel.validateAndCleanQuestionData(questionData);
    if (validResult.result === false) {
      return response.status(400).json({ message: validResult.message });
    }
    const theQuestion = validResult.data;

    // 使用 findOneAndUpdate 更新指定的題目
    const updatedRepo = await reposModel.findOneAndUpdate(
      { _id: repoId, 'questions._id': questionId },
      { $set: { 'questions.$': theQuestion } },
      { new: true }
    );

    if (!updatedRepo) {
      return response.status(404).json({ message: 'Repo not found' });
    }

    response.json({
      status: 'success',
      data: {
        repo: updatedRepo,
      },
    });
  }),
  //Repo-01-09:在指定的repo中取得指定的題目內容
  getQuestion: handleErrorAsync(async (request, response, next) => {
    const repoId = request.params.repoId;
    const questionId = request.params.questionId;

    const repo = await reposModel.findOne({ _id: repoId });
    if (!repo) {
      return response.status(404).json({ message: 'Repo not found' });
    }

    const question = repo.questions.find(q => q._id.toString() === questionId);
    if (!question) {
      return response.status(404).json({ message: 'Question not found' });
    }

    response.json({
      status: 'success',
      data: {
        question,
      },
    });
  }),
  //Repo-01-10:在指定的repo中刪除指定的題目
  deleteQuestion: handleErrorAsync(async (request, response, next) => {
    const repoId = request.params.repoId;
    const questionId = request.params.questionId;

    // 使用 findOneAndUpdate 刪除指定的 question
    const updatedRepo = await reposModel.findOneAndUpdate(
      { _id: repoId },
      { $pull: { questions: { _id: questionId } } },
      { new: true }
    );

    if (!updatedRepo) {
      return response.status(404).json({ message: 'Repo or question not found' });
    }

    response.json({
      status: 'success',
      message: 'Question deleted successfully',
    });
  }),
};

export default reposController;
