const socketIo = require('socket.io');

let io;

const initializeSocket = (server) => {
  io = socketIo(server);

  io.on('connection', (socket) => {
    console.log('A user connected');

    // Handle custom events here
    socket.on('disconnect', () => {
      console.log('User disconnected');
    });
  });
};

const sendNotification = (event, data) => {
  if (io) {
    io.emit(event, data);
  }
};

module.exports = {
  initializeSocket,
  sendNotification,
};
