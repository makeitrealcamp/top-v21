import React from 'react';

import Card from 'react-bootstrap/Card';

export default function TweetCard({ user = {}, content = '', date = '' }) {
  return (
    <Card className="mt-3">
      <Card.Body>
        <Card.Title>
          {user.name} <span className="text-muted">@{user.username}</span>
        </Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{date}</Card.Subtitle>
        <Card.Text>{content}</Card.Text>
      </Card.Body>
    </Card>
  );
}
