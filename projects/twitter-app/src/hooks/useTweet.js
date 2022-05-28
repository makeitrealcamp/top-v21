import useSWR from 'swr';
import { getTweet } from '../api/tweets';

export default function useTweet({ id }) {
  const { data, error } = useSWR(id ? `/tweets/${id}` : null, () =>
    getTweet({ id }),
  );

  return {
    data: data?.data,
    error,
    loading: !error && !data,
  };
}
