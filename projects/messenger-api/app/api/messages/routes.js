const express = require('express');

const controller = require('./controller');
const { auth } = require('../auth');

const router = express.Router();

router.route('/').post(auth, controller.buildConversation, controller.create);

module.exports = router;
