import React from 'react';
import { Alert, Spinner } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import useProfile from '../hooks/useProfile';

export default function Profile() {
  const { username } = useParams();
  const { data, error, loading } = useProfile({ username });

  if (loading) {
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  }

  return (
    <>
      {error && <Alert variant="danger">={error}</Alert>}
      <div className="px-4 py-5 my-5 text-center">
        <h1>@{data.username}</h1>
        <h1 className="display-5 fw-bold">{data.name}</h1>
        <div className="col-lg-6 mx-auto">
          <p className="lead mb-4">Description: {data.description}</p>
          <p>Location: {data.location}</p>
        </div>
      </div>
    </>
  );
}
