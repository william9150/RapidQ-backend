import reposModel from '../models/reposModel.js';

const reposController = {
  getAll: (request, response, _) => {
    reposModel.find({ isDelete: false, isPublic: true }, (error, repos) => {
      if (error) {
        return response.json(error);
      }

      response.json(repos || []);
    });
  },

  getOne: (request, response, _) => {
    reposModel.findById(request.params.id, (error, user) => {
      if (error) {
        return response.json(error);
      }

      response.json(user || {});
    });
  },

  update: (request, response, _) => {
    reposModel.findOneAndUpdate(request.params.id, request.body, { new: true }, (error, user) => {
      if (error) {
        return response.json(error);
      }

      response.json(user);
    });
  },
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
};

export default reposController;
