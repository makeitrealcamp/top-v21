const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLNonNull,
  GraphQLInputObjectType,
} = require('graphql');

const actorType = new GraphQLObjectType({
  name: 'Actor',
  description: 'An actor',
  fields: {
    id: {
      type: GraphQLID,
      description: 'the id of the actor',
    },
    name: {
      type: GraphQLString,
      description: 'the name of the actor',
    },
    createdAt: {
      type: GraphQLString,
    },
    updatedAt: {
      type: GraphQLString,
    },
  },
});

const actorInputType = new GraphQLInputObjectType({
  name: 'ActorInput',
  type: actorType,
  fields: {
    name: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'the name of the actor',
    },
  },
});

module.exports = {
  actorType,
  actorInputType,
};
