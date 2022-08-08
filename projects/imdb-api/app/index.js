const express = require('express');
const cors = require('cors');

const graphql = require('./graphql');

const app = express();

app.use(cors());

app.use('/graphql', graphql);

module.exports = app;
