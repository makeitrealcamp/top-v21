const { readFile, writeFile } = require('fs/promises');

const filename = 'data.json';
const filepath = `data/${filename}`;

async function load() {
  let items;
  try {
    const content = await readFile(filepath, 'utf-8');
    items = JSON.parse(content);
  } catch (e) {
    items = [];
  }
  // No es necesario devolver una promesa
  // cuando se utiliza async
  // return Promise.resolve(items);
  return items;
}

function save(items) {
  return writeFile(filepath, JSON.stringify(items, null, 2));
}

module.exports = {
  load,
  save,
};
