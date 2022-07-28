import React from 'react';
import {
  Row,
  Col,
  ListGroup,
  Badge,
  Form,
  Button,
  Card,
} from 'react-bootstrap';

export default function Home() {
  return (
    <Row className="my-4">
      <Col md={4}>
        <ListGroup>
          <ListGroup.Item
            as="li"
            className="d-flex justify-content-between align-items-start"
          >
            <img
              src="https://via.placeholder.com/48x48"
              className="rounded-circle img-thumbnail me-2"
              alt=""
            />
            <div className="ms-2 me-auto">
              <div className="fw-bold">Juan Granados</div>
              jgranados
            </div>
            <Badge bg="primary" pill>
              online
            </Badge>
          </ListGroup.Item>
          <ListGroup.Item
            as="li"
            className="d-flex justify-content-between align-items-start"
          >
            <img
              src="https://via.placeholder.com/48x48"
              className="rounded-circle img-thumbnail me-2"
              alt=""
            />
            <div className="ms-2 me-auto">
              <div className="fw-bold">Miriam Damian</div>
              mdamian
            </div>
            <Badge bg="secondary" pill>
              offline
            </Badge>
          </ListGroup.Item>
          <ListGroup.Item
            as="li"
            className="d-flex justify-content-between align-items-start"
          >
            <img
              src="https://via.placeholder.com/48x48"
              className="rounded-circle img-thumbnail me-2"
              alt=""
            />
            <div className="ms-2 me-auto">
              <div className="fw-bold">Samuel Hincapié</div>
              shincapie
            </div>
            <Badge bg="secondary" pill>
              offline
            </Badge>
          </ListGroup.Item>
        </ListGroup>
      </Col>
      <Col md={8} className="d-flex flex-column border-start">
        <Form.Group className="mb-3 d-flex">
          <Form.Control type="text" placeholder="Enter your message" />
          <Button variant="primary" type="submit">
            Enviar
          </Button>
        </Form.Group>

        <div className="d-flex flex-column">
          <Card className="my-1 w-auto rounded-pill bg-light text-dark align-self-start">
            <Card.Body className="text-start">Hola</Card.Body>
          </Card>

          <Card className="my-1 w-auto rounded-pill bg-primary text-white align-self-end">
            <Card.Body className="text-end">Hola, como estas?</Card.Body>
          </Card>
        </div>
      </Col>
    </Row>
  );
}
