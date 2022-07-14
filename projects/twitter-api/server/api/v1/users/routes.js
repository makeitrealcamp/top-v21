const express = require('express');
const controller = require('./controller');
const { auth } = require('../auth');

const router = express.Router();

router.route('/account').post(auth, controller.account);

module.exports = router;
