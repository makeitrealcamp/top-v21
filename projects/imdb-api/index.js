const http = require('http');

const app = require('./app');
const { port } = require('./app/config');

const server = http.createServer(app);

server.listen(port, () => {
  console.log(`Server running at port :${port}`);
});
