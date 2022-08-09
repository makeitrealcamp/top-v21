const Movie = require('./model');

const findMovieById = async (source, args, context) => {
  const { id } = args;

  const data = await Movie.findOne({ where: { id } });
  return data;
};

const findAllMovies = async () => {
  const data = await Movie.findAll();
  return data;
};

const createMovie = async (source, args, context) => {
  const { input } = args;

  const data = await Movie.create(input);
  return data;
};

module.exports = {
  createMovie,
  findAllMovies,
  findMovieById,
};
