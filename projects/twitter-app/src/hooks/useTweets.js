import useSWR from 'swr';

import { getTweets } from '../api/tweets';

export default function useTweets() {
  const { data, error } = useSWR(`/tweets`, getTweets);

  return {
    data: data?.data,
    error,
    loading: !error && !data,
  };
}
