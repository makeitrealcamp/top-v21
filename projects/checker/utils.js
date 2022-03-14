function transformItems(items) {
  const result = items.map(function (item) {
    const { completed = false } = item;
    const checked = completed ? '[✓]' : '[ ]';
    return {
      ...item,
      checked,
    };
  });
  return result;
}

module.exports = {
  transformItems,
};
