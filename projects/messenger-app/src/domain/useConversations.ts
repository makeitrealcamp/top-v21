import { useEffect, useState } from 'react';

import { Conversation } from './../api/types';
import { getConversations } from '../api/conversations';

export default function useConversations() {
  const [data, setData] = useState<Conversation[] | undefined>();
  const [error, setError] = useState<Error | undefined>();
  const [loading, setLoading] = useState(false);

  async function loadConversations() {
    try {
      setLoading(true);
      setError(undefined);

      const json = await getConversations();

      setLoading(false);
      setData(json.data);
    } catch (error) {
      setLoading(false);
      if (error instanceof Error) {
        setError(error);
      }
    }
  }

  useEffect(() => {
    loadConversations();
  }, []);

  return {
    data,
    error,
    loading,
  };
}
