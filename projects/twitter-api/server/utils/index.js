const config = require('../config');

const { pagination, sort, populate } = config;

const paginationParams = ({
  limit = pagination.limit,
  page = pagination.page,
  skip,
}) => ({
  limit: parseInt(limit, 10),
  page: skip ? 0 : parseInt(page, 10),
  skip: skip ? parseInt(skip, 10) : (page - 1) * limit,
});

const sortParams = (
  { sortBy = sort.sortBy.default, direction = sort.direction.default },
  fields,
) => {
  const allowList = {
    sortBy: [...sort.sortBy.fields, ...Object.getOwnPropertyNames(fields)],
    direction: sort.direction.options,
  };
  return {
    sortBy: allowList.sortBy.includes(sortBy) ? sortBy : sort.sortBy.default,
    direction: allowList.direction.includes(direction)
      ? direction
      : sort.direction.default,
  };
};

const populateToObject = (populateNames, virtuals = {}) => {
  const virtualNames = Object.getOwnPropertyNames(virtuals);
  return populateNames.map((item) => {
    let options = {};
    if (virtualNames.includes(item)) {
      options = {
        limit: populate.virtuals.limit,
        sort: {
          [populate.virtuals.sort]: populate.virtuals.direction,
        },
      };
    }
    return {
      path: item,
      options,
    };
  });
};

const filterByNested = (params = {}, referencesNames = []) => {
  const paramsNames = Object.getOwnPropertyNames(params);
  const populateNames = referencesNames.filter(
    (item) => !paramsNames.includes(item),
  );
  return {
    filters: params,
    populate: populateNames.join(''),
  };
};

module.exports = {
  paginationParams,
  sortParams,
  populateToObject,
  filterByNested,
};
