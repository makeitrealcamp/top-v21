import { getRandomNumber } from './utils';

function transformPokemonData(data) {
  return {
    name: data.name,
    health: {
      initial: data.stats[0].base_stat,
      current: data.stats[0].base_stat,
      bar: 'green',
    },
    artwork: data.sprites.other['official-artwork'].front_default,
    types: data.types.map((item) => ({ name: item.type.name })),
    moves: data.moves.slice(0, 4).map((item) => ({ name: item.move.name })),
  };
}

async function getPokemon() {
  const id = getRandomNumber(150, 1);
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  const data = await response.json();
  return transformPokemonData(data);
}

export async function getState() {
  const pokemons = await Promise.all([getPokemon(), getPokemon()]);

  return {
    pokemons,
    position: 0,
  };
}
