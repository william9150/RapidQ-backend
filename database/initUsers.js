import bcrypt from 'bcrypt';
import Users from '../models/usersModel.js';

const initUsers = async () => {
  try {
    //delete all users
    await Users.deleteMany({});
    //create admin user
    const hash = bcrypt.hashSync('admin', 10);
    const newUser = new Users({ email: 'admin@gmail.com', password: hash });
    await newUser.save();
  } catch (error) {
    console.error('使用者資料初始化失敗', error);
  }
};

export default initUsers;
