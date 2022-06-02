import useSWR from 'swr';
import { getTweet, updateTweet } from '../api/tweets';

export default function useTweet({ id }) {
  const { data, error, mutate } = useSWR(id ? `/tweets/${id}` : null, () =>
    getTweet({ id }),
  );

  async function update(payload) {
    const response = await updateTweet(payload);
    mutate({ data: response.data }, false);
  }

  function like() {
    const payload = {
      likes: data.data.likes + 1,
    };

    mutate(
      {
        data: {
          ...data.data,
          ...payload,
        },
      },
      false,
    );

    updateTweet({
      id,
      ...payload,
    });
  }

  return {
    data: data?.data,
    error,
    loading: !error && !data,
    actions: {
      update,
      like,
    },
  };
}
