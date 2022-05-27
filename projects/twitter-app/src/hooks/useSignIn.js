import { useCallback, useEffect, useState } from 'react';
import { signIn } from '../api/users';

export default function useSignIn({ email, password }) {
  const [data, setData] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const requestSignIn = useCallback(
    async function requestSignIn() {
      try {
        setError('');
        setLoading(true);
        const json = await signIn({
          email,
          password,
        });

        setData(json.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    },
    [email, password],
  );

  useEffect(() => {
    if (email && password) {
      requestSignIn();
    }
  }, [email, password, requestSignIn]);

  return {
    data,
    error,
    loading,
  };
}
