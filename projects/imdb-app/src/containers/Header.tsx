import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import NavUser from './NavUser';

export default function Header() {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Link to="/" className="navbar-brand">
          IMDB
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link to="/create" className="btn btn-primary me-2">
              Create
            </Link>
            <Link to="/actors" className="nav-link">
              Actors
            </Link>
            <Link to="/categories" className="nav-link">
              Categories
            </Link>
          </Nav>
          <NavUser />
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
