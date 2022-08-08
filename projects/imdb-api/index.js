const { graphql, buildSchema } = require('graphql');

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

const movie = () => {
  return {
    id: () => '1',
    title: () => 'Back to the Future',
    duration: () => 180,
  };
};

// The rootValue provides a resolver function for each API endpoint
const resolvers = {
  movie,
};

const query = `
  query {
    movie {
      id
      title
      duration
    }
  }
`;

graphql({
  schema,
  source: query,
  rootValue: resolvers,
}).then((response) => {
  console.log(JSON.stringify(response, null, 2));
});
