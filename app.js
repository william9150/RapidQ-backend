import './database/db.js';
import http from 'node:http';
import express from 'express';
import cors from 'cors';
import routes from './routes/index.js';
import { appError, errorHandlerMainProcess } from './utils/errorHandler.js';
import setupSocket from './socket/room.js';
import { config } from './config.js';
import { fileURLToPath } from 'url';
import path from 'path';

const roomInfo = {};

const app = express();
const server = new http.Server(app);
const socketIO = setupSocket(server, roomInfo); 
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors({ origin: config.ALLOWLIST_HOSTS, credentials: true }));
app.use(express.json());

routes(app);

// 錯誤管理
// app.use(errorHandlerMainProcess);
// app.use((req, res, next) => {
//     next(appError(404, '40401', '無此路由資訊'));
// });
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