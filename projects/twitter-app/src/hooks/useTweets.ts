import useSWR from 'swr';

import { getTweets, updateTweet } from '../api/tweets';
import { Tweet } from '../api/types';

interface useTweetsReturn {
  data?: Tweet[];
  error: Error;
  loading: boolean;
  actions: {
    update: (payload: any) => void;
  };
}

export default function useTweets(): useTweetsReturn {
  const { data, error, mutate } = useSWR(`/tweets`, getTweets);

  async function update(payload) {
    const response = await updateTweet(payload);

    if (data) {
      mutate(
        {
          data: data.data.map(function (item) {
            if (item.id === payload.id) {
              return response.data;
            }
            return item;
          }),
          meta: data?.meta,
        },
        false,
      );
    }
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
