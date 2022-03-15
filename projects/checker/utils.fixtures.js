const faker = require('@faker-js/faker');

function getItem(overrides = {}) {
  const item = {
    title: faker.lorem.words(2),
    completed: faker.datatype.boolean(),
  };

  return {
    ...item,
    ...overrides,
  };
}

module.exports = {
  getItem,
};
