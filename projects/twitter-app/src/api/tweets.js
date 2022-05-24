import { formatDistance } from 'date-fns';

import http from './http';

function transformTweet(item) {
  return {
    id: item._id,
    user: {
      username: item.userId.username,
      name: item.userId.name,
    },
    content: item.content,
    date: formatDistance(new Date(item.createdAt), new Date(), {
      addSuffix: true,
    }),
    createdAt: item.createdAt,
  };
}

export async function getTweets() {
  return await http.get(`/tweets`).then((response) => {
    const { data: json } = response;

    const transformedData = json.data.map((item) => {
      return transformTweet(item);
    });

    return {
      data: transformedData,
      meta: json.meta,
    };
  });
}

export function getTweet({ id }) {
  return http.get(`/tweets/${id}`).then((response) => {
    const { data: json } = response;
    return {
      data: transformTweet(json.data),
    };
  });
}

export function createTweet({ content }) {
  return http.post(`/tweets`, { content }).then((response) => {
    const { data: json } = response;
    return {
      data: transformTweet(json.data),
    };
  });
}
