import React from 'react';
import { Container, Row, Col, Spinner } from 'react-bootstrap';
import { Routes, Route } from 'react-router-dom';

import Header from './components/Header';

const Home = React.lazy(() => import('./pages/Home'));
const NotFound = React.lazy(() => import('./pages/NotFound'));
const Create = React.lazy(() => import('./pages/Create'));
const SignIn = React.lazy(() => import('./pages/SignIn'));
const SignUp = React.lazy(() => import('./pages/SignUp'));
const Tweet = React.lazy(() => import('./pages/Tweet'));

export default function App() {
  return (
    <>
      <Header />
      <Container>
        <Row>
          <Col>
            <React.Suspense
              fallback={
                <div>
                  <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </Spinner>
                </div>
              }
            >
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/create" element={<Create />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/tweets/:id" element={<Tweet />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </React.Suspense>
          </Col>
        </Row>
      </Container>
    </>
  );
}
