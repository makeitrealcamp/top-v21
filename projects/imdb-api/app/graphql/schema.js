const { GraphQLSchema } = require('graphql');
const { queryType, mutationType } = require('./typeDef');

const schema = new GraphQLSchema({
  query: queryType,
  mutation: mutationType,
});

module.exports = schema;
