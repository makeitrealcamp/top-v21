import React from 'react';
import { Nav, NavLink } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

export default function NavUser() {
  const { isAuthenticated, user, loginWithRedirect, logout } = useAuth0();

  return isAuthenticated ? (
    <Nav>
      <Link to={`/users/${user.nickname}`} className="nav-link">
        @{user.nickname}
      </Link>
      <NavLink href="#" onClick={logout}>
        Sign Out
      </NavLink>
    </Nav>
  ) : (
    <Nav>
      <NavLink
        href="#"
        onClick={() => {
          loginWithRedirect({
            screen_hint: 'signup',
          });
        }}
      >
        Sign Up
      </NavLink>
      <NavLink
        href="#"
        onClick={() => {
          loginWithRedirect({
            redirectUri: `${window.location.origin}/account`,
          });
        }}
      >
        Sign In
      </NavLink>
    </Nav>
  );
}
