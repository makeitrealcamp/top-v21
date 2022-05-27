import React from 'react';
import { Alert, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import TweetCard from '../components/TweetCard';
import useTweets from '../hooks/useTweets';

export default function List() {
  const navigate = useNavigate();

  const { data, error, loading } = useTweets();

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
