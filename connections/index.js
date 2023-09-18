const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const initUsers = require('../db/initUsers');

const DB = process.env.DATABASE;
const INIT_DB = process.env.INIT_DB === 'true';
console.log('Rapid Q is activated!');
// mongoose
//     .connect(DB)
//     .then(async () => {
//         console.log('資料庫連接成功');
//         if (INIT_DB) {
//             console.log('初始化 DB');
//             // await initUsers();
//         }
//     })
//     .then(() => {
//         if (process.env.NODE_ENV === 'dev') {
//             console.log('API使用方式請參考: http://localhost:3000/api-doc');
//         }
//     })
//     .catch((err) => console.error('資料庫連接失敗', err));
