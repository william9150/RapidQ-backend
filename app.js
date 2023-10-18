import './database/db.js';
import http from 'node:http';
import express from 'express';
import cors from 'cors';
import consola from 'consola';
import routes from './routes/index.js';
import { appError, errorHandlerMainProcess } from './utils/errorHandler.js';
import { socket } from './socket/index.js';
import { config } from './config.js';
import { fileURLToPath } from 'url';
import path from 'path';

const app = express();
const server = new http.Server(app);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors({ origin: config.ALLOWLIST_HOSTS, credentials: true }));
app.use(express.json());

routes(app);

// 錯誤管理
app.use(errorHandlerMainProcess);
// app.use((req, res, next) => {
//     next(appError(404, '40401', '無此路由資訊'));
// });

import { Server } from 'socket.io';

const socketIO = new Server(server);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

const roomInfo = {};

socketIO.on('connection', (socket) => {
  const url = socket.request.headers.referer;
  const splited = url.split('/');
  const roomID = splited[splited.length - 1];
  let user = '';

  socket.on('join', (userName) => {
    user = userName;

    if (!roomInfo[roomID]) {
      roomInfo[roomID] = [];
    }
    roomInfo[roomID].push(user);

    socket.join(roomID);
    socketIO.to(roomID).emit('sys', `${user}加入了房间`, roomInfo[roomID]);
    console.log(`${user}加入了${roomID}`);
  });

  socket.on('leave', () => {
    socket.emit('user-leave');
  });

  socket.on('user-leave', () => {
    // Handle user leaving the room here
    const index = roomInfo[roomID].indexOf(user);
    if (index !== -1) {
      roomInfo[roomID].splice(index, 1);
    }
  
    socket.leave(roomID);
    socketIO.to(roomID).emit('sys', `${user}退出了房间`, roomInfo[roomID]);
    console.log(`${user}退出了${roomID}`);
  });

  socket.on('message', (msg) => {
    if (roomInfo[roomID].indexOf(user) === -1) {
      return false;
    }
    socketIO.to(roomID).emit('msg', user, msg);
  });
});

app.get('/room/:roomID', (req, res) => {
  const roomID = req.params.roomID;
  res.render('room', {
    roomID,
    users: roomInfo[roomID],
  });
});

server.listen(3001, () => {
  console.log('server listening on port 3001');
});


export default app;