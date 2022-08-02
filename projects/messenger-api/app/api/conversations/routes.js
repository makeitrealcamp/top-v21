const express = require('express');

const controller = require('./controller');
const { auth } = require('../auth');

const router = express.Router();

router.route('/').get(auth, controller.all);
router.route('/').post(auth, controller.create);

module.exports = router;
