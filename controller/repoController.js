import reposModel from '../models/reposModel.js';
import { questionSchema, optionSchema } from '../schema/repos.js';
import { handleErrorAsync } from '../utils/errorHandler.js';
import getHttpResponse from '../utils/successHandler.js';

const reposController = {
  //Repo-01-01:取得所有repo
  getAll: handleErrorAsync(async (request, response, _) => {
    const repos = await reposModel.find({ $or: [{ userId: request.user._id }, { isPublic: true }] });
    response.status(200).json(
      getHttpResponse({
        data: repos,
      })
    );
  }),
  //Repo-01-02:取得指定的repo
  getOne: handleErrorAsync(async (request, response, _) => {
    const repo = reposModel.findById(request.params.id);
    response.status(200).json(
      getHttpResponse({
        data: repo,
      })
    );
  }),
  //Repo-01-03:建立一個新的repo
  createRepo: handleErrorAsync(async (request, response, _) => {
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
  cloneRepo: handleErrorAsync(async (request, response, _) => {
    const oldRepo = await reposModel.findById(request.params.id);
    if (!oldRepo) {
      throw new appError('找不到指定的題庫', 404);
    }
    const newRepo = new reposModel(oldRepo);
    newRepo._id = null;
    newRepo.isDelete = false;
    newRepo.save((error, repo) => {
      if (error) {
        return response.json(error);
      }
      response.status(200).json(
        getHttpResponse({
          data: repo,
        })
      );
    });
  }),

  //Repo-01-05:刪除指定的repo
  delete: handleErrorAsync(async (request, response, _) => {
    reposModel.findOneAndUpdate(
      { _id: request.params.id }, //查詢條件
      { isDelete: true }, // 更新內容
      { new: true },
      (error, repo) => {
        if (error) {
          return response.json(error);
        }
        response.json(repo);
      }
    );
  }),

  //Repo-01-06:更新指定的repo(題庫名稱與狀態)
  updateRepo: handleErrorAsync(async (request, response, _) => {
    reposModel.findOneAndUpdate(request.params.id, request.body, { new: true }, (error, user) => {
      if (error) {
        return response.json(error);
      }

      response.json(user);
    });
  }),

  //Repo-01-07:在指定的repo中新增題目(需要產生題目id)
  addQuestion: handleErrorAsync(async (request, response, _) => {
    const newQuestion = {
      type: request.body.type,
      title: request.body.title,
      imgUrl: request.body.imgUrl,
      options: request.body.options,
      answer: request.body.answer,
    };
    console.log('check point 傳進來的參數', request.params);
    const repo = await reposModel.findById(request.params.repoId);
    if (!repo) {
      throw new appError('找不到指定的題庫', 404);
    }
    repo.questions.push(newQuestion);
    repo.updatedAt = Date.now(); // Update the updatedAt timestamp
    repo.save((error, repo) => {
      if (error) {
        return response.json(error);
      }
      response.status(200).json(
        getHttpResponse({
          data: repo,
        })
      );
    });
  }),
  //Repo-01-08:在指定的repo中修改題目內容
  updateQuestion: handleErrorAsync(async (request, response, _) => {
    reposModel.findById(request.params.id, (error, repo) => {
      if (error) {
        return response.json(error);
      }

      const question = repo.questions.id(request.params.questionId);
      question.set(request.body);
      repo.updatedAt = Date.now(); // Update the updatedAt timestamp
      repo.save((error, repo) => {
        if (error) {
          return response.json(error);
        }
        response.json(repo);
      });
    });
  }),
  //Repo-01-09:在指定的repo中取得指定題目內容
  getQuestion: handleErrorAsync(async (request, response, _) => {
    reposModel.findById(request.params.id, (error, repo) => {
      if (error) {
        return response.json(error);
      }

      const question = repo.questions.id(request.params.questionId);
      response.json(question);
    });
  }),
  //Repo-01-10:在指定的repo中刪除指定題目
  deleteQuestion: handleErrorAsync(async (request, response, _) => {
    reposModel.findById(request.params.id, (error, repo) => {
      if (error) {
        return response.json(error);
      }

      repo.questions.id(request.params.questionId).remove();
      repo.updatedAt = Date.now(); // Update the updatedAt timestamp
      repo.save((error, repo) => {
        if (error) {
          return response.json(error);
        }
        response.json(repo);
      });
    });
  }),
};

export default reposController;
