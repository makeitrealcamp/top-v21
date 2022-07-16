import { formatDistance } from 'date-fns';
import { SERVER_URL } from '../const';
import { transformComment } from './comments';

import type { Tweet, TweetInput } from './types';

import http from './http';

function transformTweet(item: TweetInput): Tweet {
  return {
    id: item._id,
    user: {
      username: item.userId?.username,
      name: item.userId?.name,
      firstname: item.userId?.firstname,
      lastname: item.userId?.lastname,
      email: item.userId?.email,
    },
    content: item.content,
    date: formatDistance(new Date(item.createdAt), new Date(), {
      addSuffix: true,
    }),
    createdAt: item.createdAt,
    commentsCount: item.commentsCount ?? 0,
    comments: Array.isArray(item.comments)
      ? item.comments.map(transformComment)
      : [],
    likes: item.likes,
    photo: {
      ...item.photo,
      path: item.photo?.path ? `${SERVER_URL}/${item.photo.path}` : '',
    },
  };
}

export async function getTweets() {
  return await http.get(`/tweets`).then((response) => {
    const { data: json } = response;

    const transformedData: Tweet[] = json.data.map((item) => {
      return transformTweet(item);
    });

    return {
      data: transformedData,
      meta: json.meta,
    };
  });
}

interface getTweetParams {
  id: string;
}

export function getTweet({ id }: getTweetParams) {
  return http.get(`/tweets/${id}`).then((response) => {
    const { data: json } = response;
    return {
      data: transformTweet(json.data),
    };
  });
}

export function createTweet(formData) {
  return http.post(`/tweets`, formData).then((response) => {
    const { data: json } = response;
    return {
      data: transformTweet(json.data),
    };
  });
}

export function updateTweet(payload) {
  const { id } = payload;
  return http.put(`/tweets/${id}`, payload).then((response) => {
    const { data: json } = response;
    return {
      data: transformTweet(json.data),
    };
  });
}
