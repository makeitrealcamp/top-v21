const { GraphQLObjectType } = require('graphql');

const { movieQueries } = require('./movies/queries');
const { movieMutations } = require('./movies/mutations');

const queryType = new GraphQLObjectType({
  name: 'QueryType',
  description: 'The root query type',
  fields: {
    ...movieQueries,
  },
});

const mutationType = new GraphQLObjectType({
  name: 'Mutation',
  description: 'The root mutation type',
  fields: {
    ...movieMutations,
  },
});

module.exports = {
  queryType,
  mutationType,
};
