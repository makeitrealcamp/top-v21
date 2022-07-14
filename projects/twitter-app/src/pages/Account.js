import React, { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';
import { syncAccount } from '../api/users';

export default function Account() {
  const navigate = useNavigate();
  const { user, getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    async function onSyncAccount() {
      const access_token = await getAccessTokenSilently();
      await syncAccount(user, access_token);
      navigate('/');
    }
    if (user) {
      onSyncAccount();
    }
  }, [getAccessTokenSilently, navigate, user]);

  return <p>Syncing account</p>;
}
