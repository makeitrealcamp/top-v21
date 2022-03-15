const utils = require('./utils');
const { getItem } = require('./utils.fixtures');

describe('Utils', function () {
  describe('logItems with default params', function () {
    test('without any param', function () {
      const result = utils.logItems();

      expect(result).toEqual([]);
    });

    test('with empty items', function () {
      const result = utils.logItems([]);

      expect(result).toEqual([]);
    });
  });

  describe('logItems formatting', function () {
    test('with one item completed', function () {
      const item = getItem({
        completed: true,
      });
      const result = utils.logItems([item]);

      expect(result).toEqual([
        {
          ...item,
          checked: '[✓]',
        },
      ]);
    });

    test('with one item incompleted', function () {
      const item = getItem({
        completed: false,
      });

      const result = utils.logItems([item]);

      expect(result).toEqual([
        {
          ...item,
          checked: '[ ]',
        },
      ]);
    });
  });
});
