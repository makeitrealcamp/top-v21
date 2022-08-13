import React, { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';

interface AddModalProps {
  title: string;
  show: boolean;
  handleClose: () => void;
  handleConfirm: (name: string) => void;
}

export default function AddModal({
  title,
  show = false,
  handleClose,
  handleConfirm,
}: AddModalProps) {
  const [name, setName] = useState('');
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter email"
            required
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button
          variant="primary"
          onClick={() => {
            handleConfirm(name);
            setName('');
          }}
        >
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
