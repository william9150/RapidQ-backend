import bcrypt from 'bcrypt';
import Users from '../models/usersModel.js';
import consola from 'consola';

const initUsers = async () => {
  try {
    //find user email==admin@gmail.com
    const adminUser = await Users.findOne({ email: 'admin@gmail.com' });
    if (adminUser) {
      return;
    } else {
      //delete all users
      await Users.deleteMany({});
      //create admin user
      //   const hash = bcrypt.hashSync('admin', 10);
      const newUser = new Users({ email: 'admin@gmail.com', password: 'admin' });
      await newUser.save();
      consola.success('使用者資料初始化成功');
    }
  } catch (error) {
    consola.error('使用者資料初始化失敗', error);
  }
};

export default initUsers;
