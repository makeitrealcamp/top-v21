const { Conversation, Message } = require('../models');

exports.buildConversation = async (req, res, next) => {
  const { auth, body = {} } = req;
  const { recipientId } = body;
  let { conversationId } = body;
  const { id: senderId } = auth;

  if (!conversationId) {
    try {
      const conversation = await Conversation.findConversation(
        senderId,
        recipientId,
      );

      if (!conversation) {
        const newConversation = await Conversation.create({
          user1Id: senderId,
          user2Id: recipientId,
        });
        conversationId = newConversation.id;
      } else {
        conversationId = conversation.id;
      }

      req.body.conversationId = conversationId;
      next();
    } catch (error) {
      next(error);
    }
  } else {
    next();
  }
};

exports.create = async (req, res, next) => {
  const { auth = {}, body = {} } = req;
  const { text, conversationId } = body;
  const { id: senderId } = auth;

  try {
    const message = await Message.create({
      text,
      senderId,
      conversationId,
    });

    res.json({
      data: message,
    });
  } catch (error) {
    next(error);
  }
};
