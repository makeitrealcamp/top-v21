const { GraphQLID, GraphQLNonNull, GraphQLList } = require('graphql');

const { actorType } = require('./typeDef');
const { findActorById, findAllActors } = require('./resolvers');

const actorQueries = {
  actor: {
    type: actorType,
    args: {
      id: {
        type: new GraphQLNonNull(GraphQLID),
        description: 'The id of the actor',
      },
    },
    resolve: findActorById,
  },
  actors: {
    type: new GraphQLList(actorType),
    resolve: findAllActors,
  },
};

module.exports = {
  actorQueries,
};
