import React from 'react';
import { Navbar, Container, Nav, Row, Col } from 'react-bootstrap';

import List from './containers/List';

export default function App() {
  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="#">Twitter</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#">Create</Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link href="#">Sign Up</Nav.Link>
              <Nav.Link href="#">Sign In</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container>
        <Row>
          <Col>
            <List />
          </Col>
        </Row>
      </Container>
    </>
  );
}
