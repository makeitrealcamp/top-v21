const express = require('express');

const router = express.Router();
const conversations = require('./conversations/routes');
const messages = require('./messages/routes');
const users = require('./users/routes');

router.use('/conversations', conversations);
router.use('/messages', messages);
router.use('/users', users);

module.exports = router;
