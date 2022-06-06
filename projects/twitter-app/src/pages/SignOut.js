import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';

import UserContext from '../containers/UserContext';

export default function SignOut() {
  const { setUser } = useContext(UserContext);

  setUser(null);

  return <Navigate to="/signin" />;
}
