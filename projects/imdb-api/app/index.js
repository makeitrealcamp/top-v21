const express = require('express');
const cors = require('cors');

const graphql = require('./graphql');

const app = express();

app.use(cors());

graphql(app);

module.exports = app;
