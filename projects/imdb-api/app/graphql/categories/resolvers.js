const { Category } = require('../models');

const findCategoryById = (source, args, context) => {
  if (source?.categoryId) {
    return Category.findOne({ where: { id: source?.categoryId } });
  }
  if (args.id) {
    return Category.findOne({ where: { id: args.id } });
  }
};

const findAllCategories = async () => {
  const data = await Category.findAll();
  return data;
};

const createCategory = async (source, args, context) => {
  const { input } = args;

  const data = await Category.create(input);
  return data;
};

module.exports = {
  createCategory,
  findAllCategories,
  findCategoryById,
};
