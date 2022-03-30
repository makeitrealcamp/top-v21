const http = require('http');

const app = require('./server');
const database = require('./server/database');
const {
  database: { protocol, url, username, password },
  port,
} = require('./server/config');

// Database
database.connect({
  protocol,
  url,
  username,
  password,
});

// Web Server
const server = http.createServer(app);

server.listen(port, function () {
  console.log(`Server running at ${port}`);
});
