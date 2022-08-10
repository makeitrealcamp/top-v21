const { GraphQLNonNull } = require('graphql');

const { actorType, actorInputType } = require('./typeDef');
const { createActor } = require('./resolvers');

const actorMutations = {
  createActor: {
    type: actorType,
    args: {
      input: {
        type: new GraphQLNonNull(actorInputType),
      },
    },
    resolve: createActor,
  },
};

module.exports = {
  actorMutations,
};
