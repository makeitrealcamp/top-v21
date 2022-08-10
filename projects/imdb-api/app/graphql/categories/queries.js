const { GraphQLID, GraphQLNonNull, GraphQLList } = require('graphql');

const { categoryType } = require('./typeDef');
const { findCategoryById, findAllCategories } = require('./resolvers');

const categoryQueries = {
  category: {
    type: categoryType,
    args: {
      id: {
        type: new GraphQLNonNull(GraphQLID),
        description: 'The id of the category',
      },
    },
    resolve: findCategoryById,
  },
  categories: {
    type: new GraphQLList(categoryType),
    resolve: findAllCategories,
  },
};

module.exports = {
  categoryQueries,
};
