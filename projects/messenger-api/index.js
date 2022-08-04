const http = require('http');
const { Server } = require('socket.io');

const app = require('./app');
const database = require('./app/database');
const cache = require('./app/cache');
const config = require('./app/config');
const { port } = config;

// Web Server
const server = http.createServer(app);

// Cache
cache.connect();

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

  socket.on('online', async (user) => {
    await cache.client.HSET('users', `user-${user.id}`, user.id);
    const users = await cache.client.HGETALL('users');
    console.log('🚀 users', JSON.stringify(users, null, 2));

    socket.broadcast.emit('online', user.id);
  });

  socket.on('offline', async (user) => {
    await cache.client.HDEL('users', `user-${user.id}`);

    socket.broadcast.emit('offline', user.id);
  });
});

// Database
database.sync({ alter: true });

server.listen(port, () => {
  console.log(`Server running at port:${port}/`);
});
