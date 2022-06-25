import React, { useState } from 'react';
import { Alert, Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import { createTweet } from '../api/tweets';

export default function Create() {
  const navigate = useNavigate();

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function onSubmit(event) {
    event.preventDefault();

    const { content, photo } = event.target.elements;

    const formData = new FormData();

    formData.append('content', content.value);
    formData.append('photo', photo.files[0]);

    try {
      setError('');
      setLoading(true);

      await createTweet(formData);

      setLoading(false);
      navigate('/');
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  }

  return (
    <>
      <h2 className="my-4">Create a Tweet</h2>
      {error && <Alert variant="danger">{error?.message}</Alert>}
      <Form onSubmit={onSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Photo</Form.Label>
          <Form.Control type="file" name="photo" accept="image/jpeg" />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Content</Form.Label>
          <Form.Control type="text" name="content" as="textarea" rows={5} />
        </Form.Group>
        <Button variant="primary" type="submit" disabled={loading}>
          Tweet
        </Button>
      </Form>
    </>
  );
}
