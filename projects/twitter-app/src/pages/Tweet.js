import React from 'react';
import { useParams } from 'react-router-dom';

import TweetCard from '../components/TweetCard';
import { Alert, Spinner } from 'react-bootstrap';
import useTweet from '../hooks/useTweet';

export default function Tweet() {
  const params = useParams();
  const { id = '' } = params;

  const {
    data,
    error,
    loading,
    actions: { like },
  } = useTweet({ id });

  function onLike(event) {
    like();
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
      {error && <Alert variant="danger">{error}</Alert>}
      <TweetCard
        user={data.user}
        content={data.content}
        date={data.date}
        commentsCount={data.commentsCount}
        likes={data.likes}
        onLike={onLike}
      />
    </>
  );
}
