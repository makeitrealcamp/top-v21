import React, { useContext } from 'react';
import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import UserContext from './UserContext';

export default function NavUser() {
  const { user } = useContext(UserContext);
  // If the user exists
  return user?.username ? (
    <Nav>
      <Link to={`/users/${user.username}`} className="nav-link">
        @{user.username}
      </Link>
      <Link to="/signout" className="nav-link">
        Sign Out
      </Link>
    </Nav>
  ) : (
    <Nav>
      <Link to="/signup" className="nav-link">
        Sign Up
      </Link>
      <Link to="/signin" className="nav-link">
        Sign In
      </Link>
    </Nav>
  );
}
