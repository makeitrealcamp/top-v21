function logItems(items = []) {
  const result = [];
  for (let index = 0; index < items.length; index++) {
    const { completed = false } = items[index];
    const checked = completed ? '[✓]' : '[ ]';
    result.push({
      ...items[index],
      checked,
    });
  }
  return result;
}

module.exports = { logItems };
