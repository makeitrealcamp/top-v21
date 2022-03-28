const express = require('express');

const router = express.Router();
const tweets = require('./tweets/routes');

router.use('/tweets', tweets);

module.exports = router;
