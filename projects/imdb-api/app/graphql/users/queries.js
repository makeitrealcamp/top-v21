const { GraphQLID, GraphQLNonNull, GraphQLString } = require('graphql');

const { userType } = require('./typeDef');
const { findUserById, signin } = require('./resolvers');

const userQueries = {
  user: {
    type: userType,
    args: {
      id: {
        type: new GraphQLNonNull(GraphQLID),
        description: 'The id of the user',
      },
    },
    resolve: findUserById,
  },
  signin: {
    type: userType,
    args: {
      email: {
        type: new GraphQLNonNull(GraphQLString),
        description: 'The email of the user',
      },
      password: {
        type: new GraphQLNonNull(GraphQLString),
        description: 'The password of the user',
      },
    },
    resolve: signin,
  },
};

module.exports = {
  userQueries,
};
