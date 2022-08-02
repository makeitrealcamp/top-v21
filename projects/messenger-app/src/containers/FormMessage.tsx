import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';

export default function FormMessage({
  onSendMessage,
}: {
  onSendMessage: (text: string) => void;
}) {
  const [text, setText] = useState('');
  return (
    <Form.Group className="mb-3 d-flex">
      <Form.Control
        type="text"
        placeholder="Enter your message"
        value={text}
        onChange={(event) => {
          setText(event.target.value);
        }}
      />
      <Button
        variant="primary"
        onClick={() => {
          onSendMessage(text);
          setText('');
        }}
      >
        Enviar
      </Button>
    </Form.Group>
  );
}
