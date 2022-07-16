function getRandomItem<T>(array: T[]): T {
  const index = Math.floor(Math.random() * array.length);
  return array[index];
}

const arrey = [1, 2, 3];
const result = getRandomItem(arrey);

console.log(result);

const names = ['Juan', 'Verde', 'Samuel'];
const selected = getRandomItem(names);

console.log(selected);
