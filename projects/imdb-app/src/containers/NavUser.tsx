import React, { useContext } from 'react';
import { Nav, NavLink } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import UserContext from './UserContext';

export default function NavUser() {
  const context = useContext(UserContext);

  // If the user exists
  return context?.user?.username ? (
    <Nav>
      <NavLink className="nav-link" href="#">
        @{context?.user.username}
      </NavLink>
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
