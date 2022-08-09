const { GraphQLNonNull } = require('graphql');

const { movieType, movieInputType } = require('./typeDef');
const { createMovie } = require('./resolvers');

const movieMutations = {
  createMovie: {
    type: movieType,
    args: {
      input: {
        type: new GraphQLNonNull(movieInputType),
      },
    },
    resolve: createMovie,
  },
};

module.exports = {
  movieMutations,
};
