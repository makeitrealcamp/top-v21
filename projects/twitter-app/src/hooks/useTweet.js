import { useCallback, useEffect, useState } from 'react';
import { getTweet } from '../api/tweets';

export default function useTweet({ id }) {
  const [data, setData] = useState({});
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const loadTweet = useCallback(
    async function () {
      try {
        setError('');
        setLoading(true);
        const json = await getTweet({ id });

        setData(json.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    },
    [id],
  );

  useEffect(() => {
    loadTweet();
  }, [loadTweet]);

  return {
    data,
    error,
    loading,
  };
}
