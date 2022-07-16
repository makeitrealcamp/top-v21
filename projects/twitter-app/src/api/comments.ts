import { Comment, CommentInput } from './types';
import { formatDistance } from 'date-fns';

import http from './http';

export function transformComment(item: CommentInput): Comment {
  return {
    id: item._id,
    user: {
      username: item.userId?.username,
      name: item.userId?.name,
      firstname: item.userId?.firstname,
      lastname: item.userId?.lastname,
      email: item.userId?.email,
    },
    comment: item.comment,
    date: formatDistance(new Date(item.createdAt), new Date(), {
      addSuffix: true,
    }),
    createdAt: item.createdAt,
  };
}

export function createComment(payload) {
  return http.post(`/comments`, payload).then((response) => {
    const { data: json } = response;
    return {
      data: transformComment(json.data),
    };
  });
}
