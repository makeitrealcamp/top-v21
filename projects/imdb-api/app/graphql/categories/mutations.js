const { GraphQLNonNull } = require('graphql');

const { categoryType, categoryInputType } = require('./typeDef');
const { createCategory } = require('./resolvers');

const categoryMutations = {
  createCategory: {
    type: categoryType,
    args: {
      input: {
        type: new GraphQLNonNull(categoryInputType),
      },
    },
    resolve: createCategory,
  },
};

module.exports = {
  categoryMutations,
};
