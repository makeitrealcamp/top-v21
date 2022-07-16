import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import UserContext from './UserContext';

export default function ProtectedRoute({ children }) {
  const context = useContext(UserContext);

  if (!context?.user?.username) {
    return <Navigate to="/signin" />;
  }

  return children;
}
