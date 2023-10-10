import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { config } from '../config.js';
import { ErrorHandler, verifyToken } from '../middlewares/index.js';
import Users, { checkExisting } from '../models/usersModel.js';

const { JWT_SECRET, SALT_ROUNDS } = config;

const authController = {
  login: async (request, response, next) => {
    try {
      const { email, password } = request.body;

      if (!email) {
        throw new ErrorHandler(401, 'No email found. Enter a email and try again!');
      }

      // if (email) {
      //   const check = await checkExisting(email);
      //   if (!check) {
      //     throw new ErrorHandler(401, 'email is already in use. Try another email or provide valid password!');
      //   }

      //   const token = jwt.sign({ email }, JWT_SECRET);
      //   return response.json({ success: true, token });
      // }
      const user = await Users.findOne({ email }, 'email password');
      const match = await bcrypt.compare(password, user.password);

      if (user && match) {
        const token = jwt.sign({ userId: user._id }, JWT_SECRET);
        return response.json({ success: true, token });
      }

      throw new ErrorHandler(401, 'email or password is incorrect. Try again!');
    } catch (error) {
      next(error);
    }
  },

  register: async (request, response, next) => {
    try {
      if (!request.body) {
        throw new ErrorHandler(400, 'Invalid Request');
      }
      const { email, password } = request.body;
      if (!email || !password) {
        throw new ErrorHandler(400, 'Invalid Request');
      }
      const check = await checkExisting(email);

      if (check) {
        throw new ErrorHandler(400, 'email already exists. Try another one!');
      }

      const hash = bcrypt.hashSync(password, SALT_ROUNDS);
      const newUser = new Users({ email, password: hash });

      await newUser.save();

      return response.json({
        success: true,
        message: 'Successfully registered',
      });
    } catch (error) {
      next(error);
    }
  },
};

export default authController;
