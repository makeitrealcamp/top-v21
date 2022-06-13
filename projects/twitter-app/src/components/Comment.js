import React from 'react';
import { Card } from 'react-bootstrap';

export default function Comment({ user, comment, date }) {
  return (
    <Card className="mt-3 ms-3">
      <Card.Body>
        <Card.Title>
          {user.name} @{user.username}
        </Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{date}</Card.Subtitle>
        <Card.Text>{comment}</Card.Text>
      </Card.Body>
    </Card>
  );
}
