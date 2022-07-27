const Conversation = require('./conversations/model');
const Message = require('./messages/model');
const User = require('./users/model');

Message.belongsTo(Conversation);
Conversation.hasMany(Message);

// User.hasMany(Conversation)
Conversation.belongsTo(User, { as: 'user1' });
Conversation.belongsTo(User, { as: 'user2' });

module.exports = {
  Conversation,
  Message,
  User,
};
