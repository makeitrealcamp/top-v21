const Category = require('./categories/model');
const Movie = require('./movies/model');

Category.hasMany(Movie);
Movie.belongsTo(Category);

module.exports = {
  Category,
  Movie,
};
