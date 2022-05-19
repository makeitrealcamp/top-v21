import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <>
      <div class="px-4 py-5 my-5 text-center">
        <h1>404</h1>
        <h1 class="display-5 fw-bold">Page Not Found</h1>
        <div class="col-lg-6 mx-auto">
          <p class="lead mb-4">
            Click {<Link to="/">here</Link>} to return Home
          </p>
        </div>
      </div>
    </>
  );
}
