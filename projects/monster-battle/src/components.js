import { calculateStatus } from './utils';

import './components.scss';
import './components.types.scss';

export function pokemonBox(pokemon = {}) {
  const { artwork = '' } = pokemon;

  return `
    <div class="pokemon">
      <img
        src="${artwork}"
      />
    </div>
  `;
}

export function statusBar(pokemon = {}) {
  const {
    name = '',
    health: { current = 0, initial = 0, bar = '' },
    types = [],
  } = pokemon;

  const { newPercentage } = calculateStatus(initial, current, 0);

  return `
    <div class="status">
      <div class="info">
        <p class="name">${name}</p>
      </div>
      <ul class="types">
        ${types
          .map((type) => {
            return `<li class="button ${type.name}">${type.name}</li>`;
          })
          .join('')}
      </ul>
      <div class="meter">
        <span class="bar ${bar}" style="width: ${newPercentage}%"></span>
      </div>
      <div class="health">${current}/${initial}</div>
    </div>
  `;
}

export function dialog(pokemon = {}, message = '') {
  const { name = '' } = pokemon;

  return `
    <div class="dialog">
      <p>
        <span class="name">${name}</span>,
        <span class="message">${message}</span>
      </p>
    </div>
  `;
}

export function movesBox(pokemon = {}, callback) {
  const { moves = [] } = pokemon;

  const movesContainer = document.createElement('div');
  movesContainer.className = 'moves';

  moves.forEach((move) => {
    const button = document.createElement('button');
    button.className = 'button black';
    button.textContent = move.name;

    button.addEventListener('click', callback);

    movesContainer.appendChild(button);
  });

  return movesContainer;
}
