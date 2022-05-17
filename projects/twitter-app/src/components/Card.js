import React from 'react';

export default function Card({ user = {}, content = '', date = '' }) {
  return (
    <div>
      <p>
        <strong>{user.name}</strong> @{user.username}
      </p>
      <p>{date}</p>
      <p>{content}</p>
    </div>
  );
}
