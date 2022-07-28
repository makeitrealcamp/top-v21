import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import UserContext from './UserContext';

interface ProtectedRouteProps {
  children: JSX.Element;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const context = useContext(UserContext);

  if (!context?.user?.username) {
    return <Navigate to="/signin" />;
  }

  return children;
}
