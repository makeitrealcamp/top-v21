const { Op } = require('sequelize');

const { Conversation, Message, User } = require('../models');

exports.all = async (req, res, next) => {
  const { auth } = req;
  const { id: userId } = auth;

  try {
    const conversations = await Conversation.findAll({
      where: {
        [Op.or]: [{ user1Id: userId }, { user2Id: userId }],
      },
      include: [
        {
          model: Message,
        },
        {
          model: User,
          as: 'user1',
          where: {
            id: {
              [Op.not]: userId,
            },
          },
          attributes: {
            exclude: ['password'],
          },
          required: false,
        },
        {
          model: User,
          as: 'user2',
          where: {
            id: {
              [Op.not]: userId,
            },
          },
          attributes: {
            exclude: ['password'],
          },
          required: false,
        },
      ],
      order: [[Message, 'createdAt', 'DESC']],
    });

    res.json({
      data: conversations,
    });
  } catch (error) {
    next(error);
  }
};
