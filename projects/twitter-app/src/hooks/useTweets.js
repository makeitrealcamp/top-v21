import { useEffect, useState } from 'react';

import { getTweets } from '../api/tweets';

export default function useTweets() {
  const [data, setData] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  async function loadList() {
    try {
      setError('');
      setLoading(true);
      const json = await getTweets();

      setData(json.data);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  }

  useEffect(() => {
    loadList();
  }, []);

  return {
    data,
    error,
    loading,
  };
}
