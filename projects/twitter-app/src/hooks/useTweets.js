import useSWR from 'swr';

import { getTweets, updateTweet } from '../api/tweets';

export default function useTweets() {
  const { data, error, mutate } = useSWR(`/tweets`, getTweets);

  async function update(payload) {
    const response = await updateTweet(payload);

    mutate(
      {
        data: data.data.map(function (item) {
          if (item.id === payload.id) {
            return response.data;
          }
          return item;
        }),
        meta: data.meta,
      },
      false,
    );
  }

  return {
    data: data?.data,
    error,
    loading: !error && !data,
    actions: {
      update,
    },
  };
}
