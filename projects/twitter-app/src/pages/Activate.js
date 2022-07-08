import React, { useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import { activateUser } from '../api/users';
import ErrorLayoutBuilder from '../components/ErrorLayoutBuilder';

export default function Activate() {
  const params = useParams();
  const { token } = params;
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activated, setActivated] = useState(false);

  async function onActivateuser(activateToken) {
    try {
      setLoading(true);
      setError(null);

      await activateUser(activateToken);

      setLoading(false);
      setActivated(true);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  }

  useEffect(() => {
    if (token) {
      onActivateuser(token);
    } else {
      setError(new Error('No token provided'));
    }
  }, [token]);

  if (loading) {
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  }

  if (activated || error) {
    return (
      <div className="px-4 py-5 my-5 text-center">
        <h1>Account activation</h1>
        <h1 className="display-5 fw-bold">
          Your account {error ? 'cannot be' : 'has been'} activated
        </h1>
        <div className="col-lg-6 mx-auto">
          {error ? (
            <>
              <p className="lead mb-4">
                Go to <Link to="/confirmation">Confirmation</Link> page to send
                another activation link.
              </p>
              <ErrorLayoutBuilder error={error} />
            </>
          ) : (
            <>
              <p className="lead mb-4">
                Go to <Link to="/signin">Sign In</Link> page
              </p>
            </>
          )}
        </div>
      </div>
    );
  }

  return null;
}
