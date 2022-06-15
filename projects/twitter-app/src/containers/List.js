import React, { useMemo } from 'react';
import { Alert, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import TweetCard from '../components/TweetCard';
import useTweets from '../hooks/useTweets';

export default function List({ filter = '' }) {
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

  const filteredData = useMemo(() => {
    return data?.filter((item) => {
      if (filter) {
        return item.content.includes(filter);
      } else {
        return true;
      }
    });
  }, [data, filter]);

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
      {filteredData?.map((item) => (
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
