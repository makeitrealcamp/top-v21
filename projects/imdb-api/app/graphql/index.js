const { graphqlHTTP } = require('express-graphql');

const schema = require('./schema');
const resolvers = require('./resolvers');

const graphql = graphqlHTTP({
  schema,
  graphiql: true,
  rootValue: resolvers,
});

module.exports = graphql;
