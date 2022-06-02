import React from 'react';
import { Alert, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import TweetCard from '../components/TweetCard';
import useTweets from '../hooks/useTweets';

export default function List() {
  const navigate = useNavigate();

  const {
    data,
    error,
    loading,
    actions: { update },
  } = useTweets();

  function onDisplayTweet(event, id) {
    navigate(`tweets/${id}`);
  }

  async function onLike(event, id, count) {
    event.stopPropagation();

    await update({
      id,
      likes: count + 1,
    });
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
          <TweetCard
            user={item.user}
            content={item.content}
            date={item.date}
            commentsCount={item.commentsCount}
            likes={item.likes}
            onLike={function (event) {
              onLike(event, item.id, item.likes);
            }}
          />
        </div>
      ))}
    </>
  );
}
