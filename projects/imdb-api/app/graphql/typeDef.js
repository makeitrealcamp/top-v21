const { GraphQLObjectType } = require('graphql');

const { movieQueries } = require('./movies/queries');
const { movieMutations } = require('./movies/mutations');
const { categoryQueries } = require('./categories/queries');
const { categoryMutations } = require('./categories/mutations');
const { actorQueries } = require('./actors/queries');
const { actorMutations } = require('./actors/mutations');

const queryType = new GraphQLObjectType({
  name: 'QueryType',
  description: 'The root query type',
  fields: {
    ...actorQueries,
    ...categoryQueries,
    ...movieQueries,
  },
});

const mutationType = new GraphQLObjectType({
  name: 'Mutation',
  description: 'The root mutation type',
  fields: {
    ...actorMutations,
    ...categoryMutations,
    ...movieMutations,
  },
});

module.exports = {
  queryType,
  mutationType,
};
