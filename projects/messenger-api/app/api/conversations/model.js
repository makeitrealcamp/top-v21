const { Op } = require('sequelize');

const sequelize = require('../../database');

const Conversation = sequelize.define(
  'conversation',
  {},
  {
    timestamps: true,
  },
);

Conversation.findConversation = async function (user1Id, user2Id) {
  try {
    const conversation = await Conversation.findOne({
      where: {
        user1Id: {
          [Op.or]: [user1Id, user2Id],
        },
        user2Id: {
          [Op.or]: [user1Id, user2Id],
        },
      },
    });

    return conversation;
  } catch (error) {
    return Promise.reject(error);
  }
};

module.exports = Conversation;
