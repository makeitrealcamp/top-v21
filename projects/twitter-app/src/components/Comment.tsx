import React from 'react';
import { Card } from 'react-bootstrap';
import { isEqual } from 'lodash';
import { Comment as CommentType } from '../api/types';

function Comment({ user, comment, date }: CommentType) {
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

export default React.memo(Comment, (prevProps, nextProps) => {
  return isEqual(prevProps, nextProps);
});
