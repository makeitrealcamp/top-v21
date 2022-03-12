const commandLineArgs = require('command-line-args');
const { load, save } = require('./store');

async function main() {
  // read command lines args
  const optionDefinitions = [
    { name: 'title', alias: 't', type: String },
    { name: 'completed', alias: 'c', type: Boolean, defaultOption: false },
    { name: 'date', alias: 'd', type: String },
  ];

  // load
  const items = await load();

  // store the new item
  const {
    title = '',
    completed = false,
    date = '',
  } = commandLineArgs(optionDefinitions);

  if (title) {
    items.push({ title, completed, date });
  }

  await save(items);

  for (let index = 0; index < items.length; index++) {
    const { title = '', completed = false, date = '' } = items[index];
    const checked = completed ? '[✓]' : '[ ]';
    console.log(`${checked} ${title} [${date}]`);
  }
}

main();
