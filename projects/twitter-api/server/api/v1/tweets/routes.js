const express = require('express');
const controller = require('./controller');
const commentsRoutes = require('../comments/routes');

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

/*
 * /api/tweets/:tweetId/comments GET -> LIST
 * /api/tweets/:tweetId/comments POST -> CREATE
 * /api/tweets/:tweetId/comments/:id GET -> READ
 * /api/tweets/:tweetId/comments/:id PUT -> UPDATE
 * /api/tweets/:tweetId/comments/:id DELETE -> DELETE
 */
router.use('/:tweetId/comments', commentsRoutes);

module.exports = router;
