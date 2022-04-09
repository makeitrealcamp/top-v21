const express = require('express');
const controller = require('./controller');
const { auth, owner } = require('../auth');
const { sanitizers } = require('./model');

const router = express.Router({
  mergeParams: true,
});

/*
 * /api/comments GET -> LIST
 * /api/comments POST -> CREATE
 * /api/comments/:id GET -> READ
 * /api/comments/:id PUT -> UPDATE
 * /api/comments/:id DELETE -> DELETE
 */

router
  .route('/')
  .get(controller.parentId, controller.list)
  .post(controller.parentId, auth, sanitizers, controller.create);

router.param('id', controller.id);

router
  .route('/:id')
  .get(controller.parentId, controller.read)
  .put(controller.parentId, auth, owner, sanitizers, controller.update)
  .delete(controller.parentId, auth, owner, controller.delete);

module.exports = router;
