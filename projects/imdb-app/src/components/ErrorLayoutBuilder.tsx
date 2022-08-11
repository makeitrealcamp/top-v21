import React from 'react';
import { Alert } from 'react-bootstrap';

interface ErrorAPI extends Error {
  statusCode?: number;
  errors?: Error[];
}

interface ErrorLayoutBuilderProps {
  error: ErrorAPI;
}

export default function ErrorLayoutBuilder({ error }: ErrorLayoutBuilderProps) {
  const variant = String(error?.statusCode).startsWith('5')
    ? 'danger'
    : 'warning';

  if (Array.isArray(error.errors)) {
    return (
      <>
        {error.errors.map((err) => (
          <Alert variant={variant}>{err?.message}</Alert>
        ))}
      </>
    );
  } else {
    return <Alert variant={variant}>{error?.message}</Alert>;
  }
}
