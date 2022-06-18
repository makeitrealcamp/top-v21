import configuration from '../config/index';

const { pagination, sort, populate } = configuration;

export const paginationParams = ({
  limit = String(pagination.limit),
  skip = String(pagination.skip),
}) => ({
  limit: parseInt(limit, 10),
  skip: parseInt(skip, 10),
});

export const sortParams = (
  { sortBy = sort.sortBy.default, direction = sort.direction.default },
  fields: Record<string, string>,
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

export const populateToObject = (populateNames: string[], virtuals = {}) => {
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

export const filterByNested = (params = {}, referencesNames = []) => {
  const paramsNames = Object.getOwnPropertyNames(params);
  const populateNames = referencesNames.filter(
    (item) => !paramsNames.includes(item),
  );
  return {
    filters: params,
    populate: populateNames.join(''),
  };
};
