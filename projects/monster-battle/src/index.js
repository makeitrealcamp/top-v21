import { getState } from './state';
import { getRandomNumber, calculateStatus, calculateBarColor } from './utils';
import { pokemonBox, dialog, statusBar, movesBox } from './components';

import './main.css';

let state;

function render() {
  const { pokemons = [], position = 0 } = state;

  // Render pokemons
  const arena = document.getElementById('arena');
  const columns = arena.getElementsByClassName('column');

  pokemons.forEach((pokemon, index) => {
    const container = columns[index];

    const pokemonHTML = pokemonBox(pokemon);
    const statusBarHTML = statusBar(pokemon);

    if (index === 0) {
      container.innerHTML = statusBarHTML + pokemonHTML;
    } else {
      container.innerHTML = pokemonHTML + statusBarHTML;
    }
  });

  // render Arrow indicator
  const indicator = document.getElementById('indicator');
  const [left, right] = indicator.getElementsByClassName('column');
  if (position === 0) {
    left.innerHTML = '<div class="arrow"></div>';
    right.innerHTML = '';
  } else {
    right.innerHTML = '<div class="arrow"></div>';
    left.innerHTML = '';
  }

  // Render controls
  const panel = document.getElementById('panel');
  const message = 'Which attack do you want to use?';
  const pokemon = pokemons[position];

  const dialogHTML = dialog(pokemon, message);
  const movesElement = movesBox(pokemon, turn);

  const [leftPanel, rightPanel] = panel.children;

  if (position === 0) {
    leftPanel.innerHTML = dialogHTML;
    rightPanel.replaceChildren(movesElement);
  } else {
    rightPanel.innerHTML = dialogHTML;
    leftPanel.replaceChildren(movesElement);
  }
}

function turn() {
  const { pokemons = [], position = 0 } = state;
  const attacked = (position + 1) % 2;
  const pokemon = state.pokemons[attacked];

  // Find DOM Elements
  const arena = document.getElementById('arena');
  const columns = arena.getElementsByClassName('column');
  const container = columns[attacked];
  const [bar] = container.getElementsByClassName('bar');
  const [health] = container.getElementsByClassName('health');

  // Turn
  const { newHealth, newPercentage } = calculateStatus(
    pokemon.health.initial,
    pokemon.health.current,
    getRandomNumber(20),
  );
  const newBarColor = calculateBarColor(newPercentage);
  const previousBarColor = pokemon?.health?.bar;

  // Update State
  pokemon.health.current = newHealth;
  pokemon.health.bar = newBarColor;

  // Update UI
  bar.setAttribute('style', `width: ${newPercentage}%`);
  bar.classList.remove(previousBarColor);
  bar.classList.add(newBarColor);

  health.textContent = `${pokemon.health.current}/${pokemon.health.initial}`;

  if (newHealth > 0) {
    state.position = (state.position + 1) % 2;
    render();
  } else {
    document.querySelector('#panel .message').textContent = 'Wins!!!';
    document.querySelector('#panel .moves').innerHTML = '';
  }
}

window.addEventListener('DOMContentLoaded', async () => {
  state = await getState();

  render();
});
