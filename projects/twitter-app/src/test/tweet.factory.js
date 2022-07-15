import { faker } from '@faker-js/faker';
import { merge } from 'lodash';
import { formatDistance } from 'date-fns';

export function generateTweet(overrides = {}) {
  const firstname = faker.name.firstName();
  const lastname = faker.name.lastName();

  const result = {
    id: faker.database.mongodbObjectId(),
    content: faker.lorem.paragraph(),
    user: {
      username: faker.internet.userName(firstname, lastname),
      firstname,
      lastname,
      name: `${firstname} ${lastname}`,
    },
    date: formatDistance(new Date(faker.date.recent()), new Date(), {
      addSuffix: true,
    }),
  };

  return merge(result, overrides);
}
