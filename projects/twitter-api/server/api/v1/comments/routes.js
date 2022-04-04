const express = require('express');
const controller = require('./controller');

const router = express.Router();

/*
 * /api/comments GET -> LIST
 * /api/comments POST -> CREATE
 * /api/comments/:id GET -> READ
 * /api/comments/:id PUT -> UPDATE
 * /api/comments/:id DELETE -> DELETE
 */

router.route('/').get(controller.list).post(controller.create);

router.param('id', controller.id);

router
  .route('/:id')
  .get(controller.read)
  .put(controller.update)
  .delete(controller.delete);

module.exports = router;
