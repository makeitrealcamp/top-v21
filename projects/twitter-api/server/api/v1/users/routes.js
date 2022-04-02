const express = require('express');
const controller = require('./controller');

const router = express.Router();

/*
 * /api/users GET -> LIST
 * /api/users POST -> CREATE
 * /api/users/:id GET -> READ
 * /api/users/:id PUT -> UPDATE
 * /api/users/:id DELETE -> DELETE
 */

router.route('/').get(controller.list).post(controller.create);

router.param('id', controller.id);

router
  .route('/:id')
  .get(controller.read)
  .put(controller.update)
  .delete(controller.delete);

module.exports = router;
