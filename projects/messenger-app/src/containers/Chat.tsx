import { Card } from 'react-bootstrap';
import { Message } from '../api/types';

interface ChatProps {
  data?: Message[];
  senderId?: number;
}

export default function Chat({ data, senderId }: ChatProps) {
  return (
    <div className="d-flex flex-column">
      {data?.map((message) => {
        if (message.senderId === senderId) {
          return (
            <Card
              className="my-1 w-auto rounded-pill bg-primary text-white align-self-end"
              key={message.id}
            >
              <Card.Body className="text-end">{message.text}</Card.Body>
            </Card>
          );
        } else {
          return (
            <Card
              className="my-1 w-auto rounded-pill bg-light text-dark align-self-start"
              key={message.id}
            >
              <Card.Body className="text-start">{message.text}</Card.Body>
            </Card>
          );
        }
      })}
    </div>
  );
}
