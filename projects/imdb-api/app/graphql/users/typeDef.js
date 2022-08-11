const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLInputObjectType,
  GraphQLList,
} = require('graphql');

const userType = new GraphQLObjectType({
  name: 'User',
  description: 'A user',
  fields: {
    id: {
      type: GraphQLID,
      description: 'the id of the user',
    },
    email: {
      type: GraphQLString,
      description: 'the email of the user',
    },
    name: {
      type: GraphQLString,
      description: 'the name of the user',
    },
    username: {
      type: GraphQLString,
      description: 'the username of the user',
    },
    token: {
      type: GraphQLString,
      description: 'the token of the user',
    },
    createdAt: {
      type: GraphQLString,
    },
    updatedAt: {
      type: GraphQLString,
    },
  },
});

const userInputType = new GraphQLInputObjectType({
  name: 'userInput',
  type: userType,
  fields: {
    email: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'the email of the user',
    },
    password: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'the password of the user',
    },
    name: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'the name of the user',
    },
    username: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'the username of the user',
    },
  },
});

module.exports = {
  userType,
  userInputType,
};
