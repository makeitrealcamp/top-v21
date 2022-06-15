import { ErrorMessage, Formik } from 'formik';
import React, { useState } from 'react';
import { Alert, Button, Form, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

import { signUp } from '../api/users';

const profileSchema = Yup.object({
  firstname: Yup.string().required(),
  lastname: Yup.string().required(),
  email: Yup.string().email().required(),
  password: Yup.string().required(),
  username: Yup.string().required(),
  description: Yup.string(),
  location: Yup.string(),
});

export default function SignUp() {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function onSubmit(values, { setSubmitting }) {
    setSubmitting(true);
    try {
      setError('');
      setLoading(true);
      await signUp(values);
      setLoading(false);
      setSubmitting(false);

      navigate('/');
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  }

  if (loading) {
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  }

  return (
    <>
      <h2 className="my-4">Sign Up</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Formik
        initialValues={{}}
        onSubmit={onSubmit}
        validationSchema={profileSchema}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Firstname</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your Firstname"
                name="firstname"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.firstname}
                required
                className={
                  touched.firstname && errors.firstname ? 'is-invalid' : ''
                }
              />
              <ErrorMessage
                name="firstname"
                className="invalid-feedback"
                component="div"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Lastname</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your Lastname"
                name="lastname"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.lastname}
                required
                className={
                  touched.lastname && errors.lastname ? 'is-invalid' : ''
                }
              />
              <ErrorMessage
                name="lastname"
                className="invalid-feedback"
                component="div"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email"
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                required
                className={touched.email && errors.email ? 'is-invalid' : ''}
              />
              <ErrorMessage
                name="email"
                className="invalid-feedback"
                component="div"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter your Password"
                name="password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
                required
                className={
                  touched.password && errors.password ? 'is-invalid' : ''
                }
              />
            </Form.Group>
            <ErrorMessage
              name="password"
              className="invalid-feedback"
              component="div"
            />
            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your Username"
                name="username"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.username}
                required
                className={
                  touched.username && errors.username ? 'is-invalid' : ''
                }
              />
              <ErrorMessage
                name="username"
                className="invalid-feedback"
                component="div"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Describe yourself"
                name="description"
                as="textarea"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.desription}
                className={
                  touched.description && errors.description ? 'is-invalid' : ''
                }
              />
              <ErrorMessage
                name="description"
                className="invalid-feedback"
                component="div"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Location</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your Location"
                name="location"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.location}
                className={
                  touched.location && errors.location ? 'is-invalid' : ''
                }
              />
              <ErrorMessage
                name="location"
                className="invalid-feedback"
                component="div"
              />
            </Form.Group>
            <Button variant="primary" type="submit" disabled={isSubmitting}>
              Submit
            </Button>
          </Form>
        )}
      </Formik>
    </>
  );
}
