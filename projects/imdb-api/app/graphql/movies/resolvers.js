const { faker } = require('@faker-js/faker');

function generateMovie(overrides = {}) {
  const movie = {
    id: String(faker.datatype.number()),
    title: faker.lorem.sentence(),
    description: faker.lorem.text(),
    duration: faker.datatype.number({ min: 30, max: 180 }),
    posterURL: faker.internet.url(),
  };

  return Object.assign(movie, overrides);
}

const collection = [
  generateMovie({
    id: '1',
    title: 'Back to Future',
  }),
  generateMovie(),
  generateMovie(),
  generateMovie(),
  generateMovie(),
];

const findMovieById = (source, args, context) => {
  const { id } = args;
  return collection.find((item) => item.id === id);
};

const findAllMovies = () => {
  return collection;
};

const createMovie = (source, args, context) => {
  const { input } = args;

  const data = generateMovie(input);
  collection.push(data);

  return data;
};

module.exports = {
  createMovie,
  findAllMovies,
  findMovieById,
};
