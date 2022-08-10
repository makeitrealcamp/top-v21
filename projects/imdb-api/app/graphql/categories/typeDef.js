const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLNonNull,
  GraphQLInputObjectType,
} = require('graphql');

const categoryType = new GraphQLObjectType({
  name: 'Category',
  description: 'A category',
  fields: {
    id: {
      type: GraphQLID,
      description: 'the id of the category',
    },
    name: {
      type: GraphQLString,
      description: 'the name of the category',
    },
    createdAt: {
      type: GraphQLString,
    },
    updatedAt: {
      type: GraphQLString,
    },
  },
});

const categoryInputType = new GraphQLInputObjectType({
  name: 'CategoryInput',
  type: categoryType,
  fields: {
    name: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'the name of the category',
    },
  },
});

module.exports = {
  categoryType,
  categoryInputType,
};
