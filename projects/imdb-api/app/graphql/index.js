const { ApolloServer } = require('apollo-server-express');

const schema = require('./schema');

const graphql = async (app) => {
  const server = new ApolloServer({
    schema,
    playground: process.env.NODE_ENV === 'development',
  });

  await server.start();

  server.applyMiddleware({
    app,
    path: '/graphql',
  });
};

module.exports = graphql;
