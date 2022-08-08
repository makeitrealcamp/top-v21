const { buildSchema } = require('graphql');

// Construct a schema, using GraphQL schema language
const schema = buildSchema(`
  type Schema {
    query: Query
  }

  type Query {
    movie: Movie
  }

  type Movie {
    id: ID
    title: String
    duration: Int
  }
`);

module.exports = schema;
