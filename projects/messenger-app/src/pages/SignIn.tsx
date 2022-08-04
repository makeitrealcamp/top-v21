import React, { useContext, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import { signIn } from '../api/users';
import ErrorLayoutBuilder from '../components/ErrorLayoutBuilder';
import UserContext from '../containers/UserContext';

import socket from '../socket';

interface FormElements extends HTMLFormControlsCollection {
  email: HTMLInputElement;
  password: HTMLInputElement;
}

export default function SignIn() {
  const navigate = useNavigate();
  const context = useContext(UserContext);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.target as HTMLFormElement;
    const { email, password } = form.elements as FormElements;

    try {
      setError(null);
      setLoading(true);
      const json = await signIn({
        email: email.value,
        password: password.value,
      });
      setLoading(false);

      context && context.setUser(json.data);
      socket.emit('online', json.data);

      navigate('/');
    } catch (error) {
      setLoading(false);
      if (error instanceof Error) {
        setError(error);
      }
    }
  }

  return (
    <>
      <h2 className="my-4">Sign In</h2>
      {error && <ErrorLayoutBuilder error={error} />}
      <Form onSubmit={onSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter your email"
            name="email"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter your Password"
            name="password"
          />
        </Form.Group>
        <Button
          variant="primary"
          type="submit"
          disabled={loading}
          title="submit"
        >
          Submit
        </Button>
      </Form>
    </>
  );
}
