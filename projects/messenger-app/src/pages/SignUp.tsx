import { ErrorMessage, Formik, FormikHelpers } from 'formik';
import React, { useState } from 'react';
import { Button, Form, Spinner } from 'react-bootstrap';
import * as Yup from 'yup';

import { signUp } from '../api/users';
import ErrorLayoutBuilder from '../components/ErrorLayoutBuilder';

const profileSchema = Yup.object({
  firstname: Yup.string().required(),
  lastname: Yup.string().required(),
  email: Yup.string().email().required(),
  password: Yup.string().required(),
  username: Yup.string().required(),
  description: Yup.string(),
  location: Yup.string(),
});

const initialValues = {
  email: '',
  password: '',
  name: '',
  username: '',
  avatarUrl: '',
};

export default function SignUp() {
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [created, setCreated] = useState(false);

  async function onSubmit(
    values: typeof initialValues,
    actions: FormikHelpers<typeof initialValues>,
  ) {
    actions.setSubmitting(true);
    try {
      setError(null);
      setLoading(true);

      const json = await signUp(values);

      setLoading(false);
      actions.setSubmitting(false);
      setEmail(json.data.email);
      setCreated(true);
    } catch (error) {
      setLoading(false);
      if (error instanceof Error) {
        setError(error);
      }
    }
  }

  if (loading) {
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  }

  if (created) {
    return (
      <div className="px-4 py-5 my-5 text-center">
        <h1>Account creation</h1>
        <h1 className="display-5 fw-bold">Your account has been created</h1>
        <div className="col-lg-6 mx-auto">
          <p className="lead mb-4">
            Check your email: <strong>{email}</strong> to activate your account.
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <h2 className="my-4">Sign Up</h2>
      {error && <ErrorLayoutBuilder error={error} />}
      <Formik
        initialValues={initialValues}
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
            <h2>Sign In information</h2>
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
              <ErrorMessage
                name="password"
                className="invalid-feedback"
                component="div"
              />
            </Form.Group>
            <h2>User information</h2>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your name"
                name="name"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
                required
                className={touched.name && errors.name ? 'is-invalid' : ''}
              />
              <ErrorMessage
                name="name"
                className="invalid-feedback"
                component="div"
              />
            </Form.Group>
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
              <Form.Label>Avatar URL</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your avatar URL"
                name="avatarUrl"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.avatarUrl}
                className={
                  touched.avatarUrl && errors.avatarUrl ? 'is-invalid' : ''
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
