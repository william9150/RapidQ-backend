import './database/db.js';
import http from 'node:http';
import express from 'express';
import cors from 'cors';
import consola from 'consola';
import routes from './routes/index.js';
import { appError, errorHandlerMainProcess } from './utils/errorHandler.js';
import { socker } from './socker/index.js';
import { config } from './config.js';

const app = express();
const server = new http.Server(app);
socker(server);

app.use(cors({ origin: config.ALLOWLIST_HOSTS, credentials: true }));
app.use(express.json());

routes(app);

app.listen(config.API_PORT, () => {
  consola.success(`Api listening on port ${config.API_PORT}!`);
  consola.success(`Swagger docs on http://localhost:${config.API_PORT}/api-docs'`);
});

// 錯誤管理
app.use(errorHandlerMainProcess);
app.use((req, res, next) => {
    next(appError(404, '40401', '無此路由資訊'));
});
