import jwt from 'jsonwebtoken';
import { config } from '../config.js';

const authenticated = (request, response, next) => {
  const token = request.headers.authorization;
  console.log('驗證token', token);
  jwt.verify(token, config.JWT_SECRET, (error, decodedId) => {
    if (error) {
      response.json('Token not provided');
    } else {
      request.user.userId = decodedId;
      next();
    }
  });
};

export const verifyToken = token => {
  try {
    const decoded = jwt.verify(token, config.JWT_SECRET);
    return decoded;
  } catch {
    return false;
  }
};

export default authenticated;
