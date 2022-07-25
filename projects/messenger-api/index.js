const http = require('http');

const app = require('./app');
const config = require('./app/config');
const { port } = config;

const server = http.createServer(app);

server.listen(port, () => {
  console.log(`Server running at port:${port}/`);
});
