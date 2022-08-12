import React, { useContext, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import ErrorLayoutBuilder from '../components/ErrorLayoutBuilder';
import UserContext from '../containers/UserContext';
import useSignIn from '../domain/useSignIn';

interface FormElements extends HTMLFormControlsCollection {
  email: HTMLInputElement;
  password: HTMLInputElement;
}

export default function SignIn() {
  const navigate = useNavigate();
  const context = useContext(UserContext);
  const [signIn, { data, error, loading }] = useSignIn();

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.target as HTMLFormElement;
    const { email, password } = form.elements as FormElements;

    signIn({
      variables: {
        email: email.value,
        password: password.value,
      },
    });
  }

  useEffect(() => {
    if (data) {
      context &&
        context.setUser({
          username: data.signin.username,
          name: data.signin.name,
          email: data.signin.email,
        });
      localStorage.setItem('token', data.signin.token);
      navigate('/');
    }
  }, [context, data, navigate]);

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
