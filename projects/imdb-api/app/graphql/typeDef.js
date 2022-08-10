const { GraphQLObjectType } = require('graphql');

const { movieQueries } = require('./movies/queries');
const { movieMutations } = require('./movies/mutations');
const { categoryQueries } = require('./categories/queries');
const { categoryMutations } = require('./categories/mutations');

const queryType = new GraphQLObjectType({
  name: 'QueryType',
  description: 'The root query type',
  fields: {
    ...movieQueries,
    ...categoryQueries,
  },
});

const mutationType = new GraphQLObjectType({
  name: 'Mutation',
  description: 'The root mutation type',
  fields: {
    ...movieMutations,
    ...categoryMutations,
  },
});

module.exports = {
  queryType,
  mutationType,
};
