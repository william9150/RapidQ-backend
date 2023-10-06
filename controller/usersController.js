import usersModel from '../models/usersModel.js';

const usersController = {
  getOne: (request, response, _) => {
    usersModel.findById(request.params.id, (error, user) => {
      if (error) {
        return response.json(error);
      }

      response.json(user || {});
    });
  },

  update: (request, response, _) => {
    usersModel.findOneAndUpdate(request.params.id, request.body, { new: true }, (error, user) => {
      if (error) {
        return response.json(error);
      }

      response.json(user);
    });
  },

  delete: (request, response, _) => {
    usersModel.remove({ _id: request.params.id }, (error, _) => {
      if (error) {
        return response.json(error);
      }
    });
    response.json(true);
  },
};

export default usersController;
