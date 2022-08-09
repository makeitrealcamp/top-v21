const http = require('http');

const app = require('./app');
const { port } = require('./app/config');
const database = require('./app/database');

const server = http.createServer(app);
database.sync({
  alter: process.env.NODE_ENV === 'development',
});

server.listen(port, () => {
  console.log(`Server running at port :${port}`);
});
