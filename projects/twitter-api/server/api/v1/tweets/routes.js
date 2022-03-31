const express = require('express');
const controller = require('./controller');

const router = express.Router();

/*
 * /api/tweets GET -> LIST
 * /api/tweets POST -> CREATE
 * /api/tweets/:id GET -> READ
 * /api/tweets/:id PUT -> UPDATE
 * /api/tweets/:id DELETE -> DELETE
 */

router.route('/').get(controller.list).post(controller.create);

router.param('id', controller.id);

router
  .route('/:id')
  .get(controller.read)
  .put(controller.update)
  .delete(controller.delete);

module.exports = router;
