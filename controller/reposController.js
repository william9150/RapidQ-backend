import reposModel from '../models/reposModel.js';

const reposController = {
  //Repo-01-01:取得所有repo
  getAll: (request, response, _) => {
    reposModel.find({ isDelete: false, isPublic: true }, (error, repos) => {
      if (error) {
        return response.json(error);
      }

      response.json(repos || []);
    });
  },
  //Repo-01-02:取得指定的repo
  getOne: (request, response, _) => {
    reposModel.findById(request.params.id, (error, user) => {
      if (error) {
        return response.json(error);
      }

      response.json(user || {});
    });
  },
  //Repo-01-03:建立一個新的repo
  createRepo: (request, response, _) => {
    const newRepo = new reposModel(request.body);

    newRepo.save((error, repo) => {
      if (error) {
        return response.json(error);
      }
      response.json(repo);
    });
  },
  //Repo-01-04:複製指定的repo
  cloneRepo: (request, response, _) => {
    reposModel.findById(request.params.id, (error, repo) => {
      if (error) {
        return response.json(error);
      }

      const newRepo = new reposModel(repo);
      newRepo._id = null;
      newRepo.save((error, repo) => {
        if (error) {
          return response.json(error);
        }
        response.json(repo);
      });
    });
  },
  //Repo-01-05:刪除指定的repo
  delete: (request, response, _) => {
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
  },
  //Repo-01-06:更新指定的repo(題庫名稱與狀態)
  update: (request, response, _) => {
    reposModel.findOneAndUpdate(request.params.id, request.body, { new: true }, (error, user) => {
      if (error) {
        return response.json(error);
      }

      response.json(user);
    });
  },
  //Repo-01-07:在指定的repo中新增題目(需要產生題目id)
  addQuestion: (request, response, _) => {
    reposModel.findById(request.params.id, (error, repo) => {
      if (error) {
        return response.json(error);
      }

      // Generate a new ObjectId for the question
      const questionId = new mongoose.Types.ObjectId();
      const newQuestion = { ...request.body, _id: questionId };

      repo.questions.push(newQuestion);
      repo.updatedAt = Date.now(); // Update the updatedAt timestamp
      repo.save((error, repo) => {
        if (error) {
          return response.json(error);
        }
        response.json(repo);
      });
    });
  },
  //Repo-01-08:在指定的repo中修改題目內容
  updateQuestion: (request, response, _) => {
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
  },
  //Repo-01-09:在指定的repo中取得指定題目內容
  getQuestion: (request, response, _) => {
    reposModel.findById(request.params.id, (error, repo) => {
      if (error) {
        return response.json(error);
      }

      const question = repo.questions.id(request.params.questionId);
      response.json(question);
    });
  },
  //Repo-01-10:在指定的repo中刪除指定題目
  deleteQuestion: (request, response, _) => {
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
  },
};

export default reposController;
