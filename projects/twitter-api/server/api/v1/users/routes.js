const express = require('express');
const controller = require('./controller');
const { auth, activate } = require('../auth');
const { sanitizers } = require('./model');

const router = express.Router();

/*
 * /api/users/signup POST -> CREATE
 * /api/users/signin POST -> LOGIN
 * /api/users/:id GET -> READ
 * /api/users/:id PUT -> UPDATE
 * /api/users/:id DELETE -> DELETE
 */

router
  .route('/signup')
  .post(sanitizers, controller.signup, controller.confirmation);
router.route('/signin').post(sanitizers, controller.signin);

router.route('/confirmation').post(controller.confirmation);
router.route('/activate/:token').get(activate, controller.activate);

router.route('/profile/:username').get(controller.read);
router.route('/profile').put(auth, controller.update);

module.exports = router;
