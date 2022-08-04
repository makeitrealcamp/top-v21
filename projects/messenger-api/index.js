const http = require('http');
const { Server } = require('socket.io');

const app = require('./app');
const database = require('./app/database');
const config = require('./app/config');
const { port } = config;

// Web Server
const server = http.createServer(app);

// Web Socket
const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

io.on('connection', (socket) => {
  console.log(`⚡️: user ${socket.id} connected`);

  socket.on('disconnect', () => {
    console.log(`⚡️: user disconnected`);
  });

  socket.on('message', (message) => {
    socket.broadcast.emit('response', message);
  });
});

// Database
database.sync({ alter: true });

server.listen(port, () => {
  console.log(`Server running at port:${port}/`);
});
