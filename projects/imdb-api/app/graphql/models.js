const Actor = require('./actors/model');
const Category = require('./categories/model');
const Movie = require('./movies/model');

Category.hasMany(Movie);
Movie.belongsTo(Category);

Actor.belongsToMany(Movie, { through: 'ActorMovies' });
Movie.belongsToMany(Actor, { through: 'ActorMovies' });

module.exports = {
  Actor,
  Category,
  Movie,
};
