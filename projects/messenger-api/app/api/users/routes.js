const express = require('express');

const controller = require('./controller');
const { auth } = require('../auth');

const router = express.Router();

router.route('/signup').post(controller.signup);
router.route('/signin').post(controller.signin);

router.route('/').get(auth, controller.all);

module.exports = router;
