import React, { useEffect, useState } from 'react';
import { Alert, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import TweetCard from '../components/TweetCard';
import { getTweets } from '../api/tweets';

export default function List() {
  const navigate = useNavigate();

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

  function onDisplayTweet(event, id) {
    navigate(`tweets/${id}`);
  }

  if (loading) {
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  }

  return (
    <>
      {error && <Alert variant="danger">={error}</Alert>}
      {data.map((item) => (
        <div
          key={item.id}
          onClick={function (event) {
            onDisplayTweet(event, item.id);
          }}
        >
          <TweetCard user={item.user} content={item.content} date={item.date} />
        </div>
      ))}
    </>
  );
}
