const { Actor, Movie } = require('../models');

const findActorById = (source, args, context) => {
  if (args.id) {
    return Actor.findOne({ where: { id: args.id } });
  }
};

const findAllActors = async (source, args, context) => {
  if (source?.id) {
    const movie = await Movie.findOne({ where: { id: source.id } });
    return movie.getActors();
  }
  return Actor.findAll();
};

const createActor = async (source, args, context) => {
  const { input } = args;

  const data = await Actor.create(input);
  return data;
};

module.exports = {
  createActor,
  findAllActors,
  findActorById,
};
