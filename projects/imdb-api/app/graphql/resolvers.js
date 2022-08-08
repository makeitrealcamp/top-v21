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

module.exports = resolvers;
