const { GraphQLNonNull } = require('graphql');

const { userType, userInputType } = require('./typeDef');
const { signup } = require('./resolvers');

const userMutations = {
  signUp: {
    type: userType,
    args: {
      input: {
        type: new GraphQLNonNull(userInputType),
      },
    },
    resolve: signup,
  },
};

module.exports = {
  userMutations,
};
