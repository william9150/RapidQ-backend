const socketIO = require('socket.io');
const mongoose = require('mongoose');

const User = require('../models/userModel');

const jwt = require('jsonwebtoken');
const userSockets = require('../utils/userSockets');
let io;

function connectSocketIO(server) {
    io = new socketIO.Server(server);

    io.use(async (socket, next) => {});

    io.on('connection', (socket) => {
        const currentUser = socket.user.id.toString();
        // console.log('check point socket', socket);
        // 將用戶的 socket.id 保存下來
        if (!userSockets[currentUser]) {
            userSockets[currentUser] = [];
        }
        userSockets[currentUser].push(socket.id);

        // 監聽訊息事件
        socket.on('message', async (data) => {});

        // 監聽read狀態更新事件
        socket.on('read', async (data) => {});

        // 當用戶斷開連接時，從使用者列表中移除
        socket.on('disconnect', () => {
            if (!socket.user || !socket.user.id) return;

            const userSocketIds = userSockets[socket.user.id];
            if (!userSocketIds) return;

            const index = userSocketIds.indexOf(socket.id);
            if (index > -1) {
                userSocketIds.splice(index, 1);
            }
            if (userSocketIds.length === 0) {
                delete userSockets[socket.user.id];
            }
        });
    });
    return io;
}
function getIO() {
    if (!io) {
        throw new Error('Socket.io not initialized!');
    }
    return io;
}

function emitConnectStatus(socket, user) {
    socket.emit('connectStatus', {
        status: 'success',
        message: '連線成功',
        user: user,
    });
}
function emitErrorMsg(socket, message) {
    socket.emit('errorMsg', {
        status: 'error',
        message: message,
    });
}

module.exports = { connectSocketIO, getIO };
