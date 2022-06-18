import http from 'http';

import configuration from './server/config';
import { connect } from './server/database';
import app from './server';

const {
  database: { protocol, url, username, password },
  port,
} = configuration;

// Database
connect({
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
