import React from 'react';
import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getUser } from '../store/userSlice';

export default function NavUser() {
  const user = useSelector(getUser);

  return user?.username ? (
    <Nav>
      <Link to="/profile" className="nav-link">
        @{user.username}
      </Link>
      <Link to="/logout" className="nav-link">
        Logout
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
