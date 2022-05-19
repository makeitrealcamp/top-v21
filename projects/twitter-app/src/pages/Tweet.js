import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import TweetCard from '../components/TweetCard';
import { getTweet } from '../api/tweets';
import { Alert, Spinner } from 'react-bootstrap';

export default function Tweet() {
  const params = useParams();
  const { id = '' } = params;

  const [data, setData] = useState({});
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  async function loadTweet() {
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
  }

  useEffect(() => {
    loadTweet();
  }, []);

  if (loading) {
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  }

  return (
    <>
      {error && <Alert variant="danger">{error}</Alert>}
      <TweetCard user={data.user} content={data.content} date={data.date} />
    </>
  );
}
