function print(items) {
  for (let index = 0; index < items.length; index++) {
    const { title = '', completed = false, date = '' } = items[index];
    const checked = completed ? '[✓]' : '[ ]';
    console.log(`${checked} ${title} [${date}]`);
  }
  return items;
}

module.exports = {
  print,
};
