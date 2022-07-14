import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

import { createTweet } from '../api/tweets';
import ErrorLayoutBuilder from '../components/ErrorLayoutBuilder';

export default function Create() {
  const { getAccessTokenSilently } = useAuth0();
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

      const access_token = await getAccessTokenSilently();
      await createTweet(formData, access_token);

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
      {error && <ErrorLayoutBuilder error={error} />}
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
