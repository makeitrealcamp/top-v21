import { ErrorMessage, Formik } from 'formik';
import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import { resetPassword } from '../api/users';
import ErrorLayoutBuilder from '../components/ErrorLayoutBuilder';

export default function ResetPassword() {
  const params = useParams();
  const { token } = params;
  const [error, setError] = useState(null);
  const [reset, setReset] = useState(false);

  async function onSubmit(values, { setSubmitting }) {
    const { password, passwordConfirmation } = values;

    try {
      setSubmitting(true);
      setError(null);

      await resetPassword(token, {
        password,
        passwordConfirmation,
      });

      setSubmitting(false);
      setReset(true);
    } catch (error) {
      setError(error);
      setSubmitting(false);
    }
  }

  const validate = (values) => {
    const errors = {};
    if (values.password !== values.passwordConfirmation) {
      errors.passwordConfirmation = 'The password must match';
    }
    return errors;
  };

  if (reset) {
    return (
      <div className="px-4 py-5 my-5 text-center">
        <h1>Forgot Password</h1>
        <h1 className="display-5 fw-bold">Your password has been reset</h1>
        <div className="col-lg-6 mx-auto">
          <p className="lead mb-4">
            Go to <Link to="/signin">Sign In</Link> page.
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <h2 className="my-4">Reset Password</h2>
      {error && <ErrorLayoutBuilder error={error} />}
      <Formik
        initialValues={{
          password: '',
          passwordConfirmation: '',
        }}
        onSubmit={onSubmit}
        validate={validate}
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
              <Form.Label>New Password</Form.Label>
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
              <Form.Text className="text-muted">
                The new password must be at least 6 characters length
              </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm your new Password"
                name="passwordConfirmation"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.passwordConfirmation}
                required
                className={
                  touched.passwordConfirmation && errors.passwordConfirmation
                    ? 'is-invalid'
                    : ''
                }
              />
              <ErrorMessage
                name="passwordConfirmation"
                className="invalid-feedback"
                component="div"
              />
            </Form.Group>
            <Button
              variant="primary"
              type="submit"
              disabled={isSubmitting || Object.values(errors).length > 0}
              title="submit"
            >
              Submit
            </Button>
          </Form>
        )}
      </Formik>
    </>
  );
}
