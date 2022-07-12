import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { confirmUser } from '../api/users';
import ErrorLayoutBuilder from '../components/ErrorLayoutBuilder';

export default function Confirmation() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');

  async function onSubmit(event) {
    event.preventDefault()

    const {email 
	} = event.target.elements

    try {
      setError(null);
      setLoading(true);

      await confirmUser({ email: email.value });

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
        <h1>Account Activation</h1>
        <h1 className="display-5 fw-bold">
          Your confirmation link has been sent
        </h1>
        <div className="col-lg-6 mx-auto">
          <p className="lead mb-4">
            Check your email: <strong>{email}</strong> to activate your account.
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      {error && <ErrorLayoutBuilder error={error} />}
      <div className="px-4 py-5 my-5 text-center">
        <h1>Account Activation</h1>
        <p>
          To get a new activation link please fill out the following information
        </p>
        <div className="col-lg-6 mx-auto">
          <p className="lead mb-4">
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
          </p>
        </div>
      </div>
    </>
  );
}
