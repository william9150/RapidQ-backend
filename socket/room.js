import { Server } from 'socket.io';

const setupSocket = (server, roomInfo) => {
  const socketIO = new Server(server);

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
      socketIO.to(roomID).emit('sys', `${user}加入了房間`, roomInfo[roomID]);
      console.log(`${user}加入了${roomID}`);
    });

    socket.on('leave', () => {
      // Handle user leaving the room here
      const index = roomInfo[roomID].indexOf(user);
      if (index !== -1) {
        roomInfo[roomID].splice(index, 1);
      }

      socket.leave(roomID);
      socketIO.to(roomID).emit('sys', `${user}退出了房間`, roomInfo[roomID]);
      console.log(`${user}退出了${roomID}`);
    });

    socket.on('message', (msg) => {
      if (roomInfo[roomID].indexOf(user) === -1) {
        return false;
      }
      socketIO.to(roomID).emit('msg', user, msg);
    });
  });

  return socketIO;
};

export default setupSocket;
