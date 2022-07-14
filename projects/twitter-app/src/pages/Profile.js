import React, { useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import { useAuth0 } from '@auth0/auth0-react';

import ErrorLayoutBuilder from '../components/ErrorLayoutBuilder';
import useProfile from '../hooks/useProfile';

export default function Profile() {
  const { getAccessTokenSilently } = useAuth0();
  const [token, setToken] = useState('');
  const { data, error, loading } = useProfile({ token });

  useEffect(() => {
    async function loadToken() {
      const access_token = await getAccessTokenSilently();
      setToken(access_token);
    }

    loadToken();
  }, [getAccessTokenSilently]);

  if (loading) {
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  }

  return (
    <>
      {error && <ErrorLayoutBuilder error={error} />}
      <div className="px-4 py-5 my-5 text-center">
        <h1>@{data?.nickname}</h1>
        <h1 className="display-5 fw-bold">{data?.name}</h1>
        <div className="col-lg-6 mx-auto">
          <p className="lead mb-4">Description: {data?.description}</p>
          <p>Location: {data?.location}</p>
        </div>
      </div>
    </>
  );
}
