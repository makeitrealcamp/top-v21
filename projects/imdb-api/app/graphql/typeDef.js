const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLNonNull,
  GraphQLList,
} = require('graphql');

const { movieType, movieInputType } = require('./movies/typeDef');
const {
  findMovieById,
  findAllMovies,
  createMovie,
} = require('./movies/resolvers');

const queryType = new GraphQLObjectType({
  name: 'QueryType',
  description: 'The root query type',
  fields: {
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
  },
});

const mutationType = new GraphQLObjectType({
  name: 'Mutation',
  description: 'The root mutation type',
  fields: {
    createMovie: {
      type: movieType,
      args: {
        input: {
          type: new GraphQLNonNull(movieInputType),
        },
      },
      resolve: createMovie,
    },
  },
});

module.exports = {
  queryType,
  mutationType,
};
