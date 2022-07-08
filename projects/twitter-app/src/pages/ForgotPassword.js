import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { forgotPassword } from '../api/users';
import ErrorLayoutBuilder from '../components/ErrorLayoutBuilder';

export default function ForgotPassword() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);
  const [email, setEmail] = useState('');

  async function onSubmit(event) {
    event.preventDefault();

    const { email } = event.target.elements;

    try {
      setError(null);
      setLoading(true);

      await forgotPassword({ email: email.value });

      setLoading(false);
      setEmail(email.value);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  }

  if (email) {
    return (
      <div className="px-4 py-5 my-5 text-center">
        <h1>Forgot Password</h1>
        <h1 className="display-5 fw-bold">
          Your link to reset your password has been sent
        </h1>
        <div className="col-lg-6 mx-auto">
          <p className="lead mb-4">
            Check your email: <strong>{email}</strong>.
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      {error && <ErrorLayoutBuilder error={error} />}
      <div className="px-4 py-5 my-5 text-center">
        <h1>Forgot Password</h1>
        <p>To reset the password please confirm your registred email</p>
        <div className="col-lg-6 mx-auto">
          <div className="lead mb-4">
            <Form onSubmit={onSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter your Email"
                  name="email"
                  required
                />
              </Form.Group>
              <Button variant="primary" type="submit" disabled={loading}>
                Submit
              </Button>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
}
