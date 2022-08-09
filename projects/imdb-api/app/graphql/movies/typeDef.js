const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLInputObjectType,
} = require('graphql');

const movieType = new GraphQLObjectType({
  name: 'Movie',
  description: 'A movie',
  fields: {
    id: {
      type: GraphQLID,
      description: 'the id of the movie',
    },
    title: {
      type: GraphQLString,
      description: 'the title of the movie',
    },
    description: {
      type: GraphQLString,
      description: 'the description of the movie',
    },
    duration: {
      type: GraphQLInt,
      description: 'the duration of the movie',
    },
    posterURL: {
      type: GraphQLString,
      description: 'the poster URL of the movie',
    },
    createdAt: {
      type: GraphQLString,
    },
    updatedAt: {
      type: GraphQLString,
    },
  },
});

const movieInputType = new GraphQLInputObjectType({
  name: 'MovieInput',
  type: movieType,
  fields: {
    title: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'the title of the movie',
    },
    description: {
      type: GraphQLString,
      description: 'the description of the movie',
    },
    duration: {
      type: new GraphQLNonNull(GraphQLInt),
      description: 'the duration of the movie',
    },
    posterURL: {
      type: GraphQLString,
      description: 'the poster URL of the movie',
    },
  },
});

module.exports = {
  movieType,
  movieInputType,
};
