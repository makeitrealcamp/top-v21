import React, { useContext, useEffect, useState } from 'react';
import { Alert, Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import UserContext from '../containers/UserContext';
import useSignIn from '../hooks/useSignIn';

export default function SignIn() {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { data, loading, error } = useSignIn({ email, password });

  async function onSubmit(event) {
    event.preventDefault();

    const { email, password } = event.target.elements;
    setEmail(email.value);
    setPassword(password.value);
  }

  useEffect(() => {
    if (data) {
      setUser(data);
      navigate('/');
    }
  }, [data, navigate, setUser]);

  return (
    <>
      <h2 className="my-4">Sign In</h2>
      {error && <Alert variant="danger">{error}</Alert>}
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
        <Button variant="primary" type="submit" disabled={loading}>
          Submit
        </Button>
      </Form>
    </>
  );
}
