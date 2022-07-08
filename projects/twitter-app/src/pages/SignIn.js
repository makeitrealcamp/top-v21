import React, { useContext } from 'react';
import { Alert, Button, Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

import { signIn } from '../api/users';
import UserContext from '../containers/UserContext';
import useFetchState from '../hooks/useFetchState';

export default function SignIn() {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const [{ error, loading }, dispatch] = useFetchState();

  async function onSubmit(event) {
    event.preventDefault();

    const { email, password } = event.target.elements;

    try {
      dispatch({ type: 'FETCH' });
      const json = await signIn({
        email: email.value,
        password: password.value,
      });
      dispatch({ type: 'FULLFILLED' });

      setUser(json.data);
      navigate('/');
    } catch (error) {
      dispatch({ type: 'REJECTED', payload: error });
    }
  }

  return (
    <>
      <h2 className="my-4">Sign In</h2>
      {error && <Alert variant="danger">{error?.message}</Alert>}
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
        <Form.Group className="mb-3">
          <Form.Label>
            <Link to="/forgot-password">Forgot Password?</Link>
          </Form.Label>
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
