import usersModel from '../models/usersModel.js';
import { generateJwtToken } from '../middleware/auth.js';
import { handleErrorAsync } from '../utils/errorHandler.js';
import getHttpResponse from '../utils/successHandler.js';

const usersController = {
  signIn: handleErrorAsync(async (request, response, _) => {
    const { email, password } = request.body;
    const user = await usersModel.findOne({ email }).select('+password');
    if (!user) {
      return response.json({ message: '使用者或密碼不正確1' });
    }
    if (user.password !== password) {
      return response.json({ message: '使用者或密碼不正確2' });
    }
    const token = generateJwtToken(user._id);
    console.log('token傳不回前端，先印在這邊:', token);
    response.status(200).json(
      getHttpResponse({
        token,
      })
    );
  }),
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
