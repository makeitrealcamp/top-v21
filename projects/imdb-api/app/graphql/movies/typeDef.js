const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLInputObjectType,
  GraphQLList,
} = require('graphql');
const { findAllActors } = require('../actors/resolvers');
const { actorType } = require('../actors/typeDef');
const { findCategoryById } = require('../categories/resolvers');
const { categoryType } = require('../categories/typeDef');

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
    category: {
      type: categoryType,
      description: 'the category of the movie',
      resolve: findCategoryById,
    },
    actors: {
      type: new GraphQLList(actorType),
      description: 'the actors and actresses of the movie',
      resolve: findAllActors,
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
    categoryId: {
      type: new GraphQLNonNull(GraphQLInt),
      description: 'the category id of the movie',
    },
    actorsIds: {
      type: new GraphQLNonNull(new GraphQLList(GraphQLInt)),
    },
  },
});

module.exports = {
  movieType,
  movieInputType,
};
