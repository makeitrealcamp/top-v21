import React, { useEffect, useState } from 'react';

import Card from '../components/Card';
import { getTweets } from '../api/tweets';

export default function List() {
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

  if (loading) {
    return <p>Loading ...</p>;
  }

  return (
    <>
      {error && <p style={{ color: 'red' }}>error</p>}
      {data.map((item) => (
        <Card
          key={item.id}
          user={item.user}
          content={item.content}
          date={item.date}
        />
      ))}
    </>
  );
}
