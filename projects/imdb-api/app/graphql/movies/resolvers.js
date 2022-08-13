const { Movie } = require('../models');

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
  if (!context?.user) {
    throw new Error('Unauthorized');
  }
  const { input } = args;
  const { actorsIds, ...body } = input;

  const movie = await Movie.create(body);
  await movie.setActors(actorsIds);

  return movie;
};

module.exports = {
  createMovie,
  findAllMovies,
  findMovieById,
};
