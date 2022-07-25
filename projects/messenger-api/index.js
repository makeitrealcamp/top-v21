const http = require('http');

const app = require('./app');
const database = require('./app/database');
const config = require('./app/config');
const { port } = config;

const server = http.createServer(app);
database.sync({ alter: true });

server.listen(port, () => {
  console.log(`Server running at port:${port}/`);
});
