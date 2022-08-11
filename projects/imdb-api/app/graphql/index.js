const { ApolloServer } = require('apollo-server-express');
const { getUser } = require('./auth');

const schema = require('./schema');

const graphql = async (app) => {
  const server = new ApolloServer({
    schema,
    playground: process.env.NODE_ENV === 'development',
    context: async ({ req }) => {
      const token = req.headers.authorization || '';

      if (token) {
        try {
          const user = await getUser({ token });
          return { user };
        } catch (error) {
          return null;
        }
      }
      return null;
    },
  });

  await server.start();

  server.applyMiddleware({
    app,
    path: '/graphql',
  });
};

module.exports = graphql;
