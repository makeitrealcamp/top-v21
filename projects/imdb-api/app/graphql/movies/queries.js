const { GraphQLID, GraphQLNonNull, GraphQLList } = require('graphql');

const { movieType } = require('./typeDef');
const { findMovieById, findAllMovies } = require('./resolvers');

const movieQueries = {
  movie: {
    type: movieType,
    args: {
      id: {
        type: new GraphQLNonNull(GraphQLID),
        description: 'The id of the movie',
      },
    },
    resolve: findMovieById,
  },
  movies: {
    type: new GraphQLList(movieType),
    resolve: findAllMovies,
  },
};

module.exports = {
  movieQueries,
};
