import React from 'react';
import { Container, Row, Col, Spinner } from 'react-bootstrap';
import { Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import ProtectedRoute from './containers/ProtectedRoute';
import { UserProvider } from './containers/UserContext';

const Home = React.lazy(() => import('./pages/Home'));
const NotFound = React.lazy(() => import('./pages/NotFound'));
const Create = React.lazy(() => import('./pages/Create'));
const SignIn = React.lazy(() => import('./pages/SignIn'));
const SignOut = React.lazy(() => import('./pages/SignOut'));
const SignUp = React.lazy(() => import('./pages/SignUp'));
const Tweet = React.lazy(() => import('./pages/Tweet'));
const Profile = React.lazy(() => import('./pages/Profile'));

export default function App() {
  return (
    <UserProvider>
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
                <Route
                  path="/create"
                  element={
                    <ProtectedRoute>
                      <Create />
                    </ProtectedRoute>
                  }
                />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/signout" element={<SignOut />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/tweets/:id" element={<Tweet />} />
                <Route path="/users/:username" element={<Profile />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </React.Suspense>
          </Col>
        </Row>
      </Container>
    </UserProvider>
  );
}
