import React from 'react';
import { useParams } from 'react-router-dom';
import { useSWRConfig } from 'swr';

import TweetCard from '../components/TweetCard';
import { Alert, Button, Form, Spinner } from 'react-bootstrap';
import useTweet from '../hooks/useTweet';
import Comment from '../components/Comment';
import { createComment } from '../api/comments';

export default function Tweet() {
  const { mutate } = useSWRConfig();
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

  async function onComment(event) {
    event.preventDefault();

    const { comment } = event.target.elements;

    try {
      await createComment({
        comment: comment.value,
        tweetId: data.id,
      });

      comment.value = '';

      mutate(`/tweets/${data.id}`);
    } catch (error) {
      console.error(error);
    }
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
        photo={data.photo}
        onLike={onLike}
      />
      <hr />
      <Form onSubmit={onComment}>
        <Form.Group className="mb-3">
          <Form.Label>Comment</Form.Label>
          <Form.Control type="text" name="comment" as="textarea" rows="3" />
        </Form.Group>
        <Button variant="primary" type="submit" disabled={loading}>
          Submit
        </Button>
      </Form>
      <hr />
      {data.comments.map(function (item) {
        return (
          <Comment
            key={item.id}
            user={item.user}
            comment={item.comment}
            date={item.date}
          />
        );
      })}
    </>
  );
}
