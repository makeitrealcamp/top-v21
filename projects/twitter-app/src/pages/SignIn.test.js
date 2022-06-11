import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import SignIn from './SignIn';
import { UserProvider } from '../containers/UserContext';
import { signIn } from '../api/users';

jest.mock('../api/users');

describe('SignIn Page', () => {
  test('SignIn with incorrect credentials', async () => {
    render(
      <BrowserRouter>
        <UserProvider>
          <SignIn />
        </UserProvider>
      </BrowserRouter>,
    );

    const errorMessage = 'Email or password are incorrect';
    signIn.mockRejectedValue(errorMessage);

    const email = screen.getByPlaceholderText(/email/i);
    const password = screen.getByPlaceholderText(/password/i);
    const submit = screen.getByTitle(/submit/i);

    fireEvent.change(email, {
      target: {
        value: 'gustavo.morales@gmail.com',
      },
    });

    fireEvent.change(password, {
      target: {
        value: 'incorrect',
      },
    });

    fireEvent.click(submit);

    await waitFor(() => screen.findByText(errorMessage));

    expect(screen.getByText(errorMessage)).toBeTruthy();
  });
});
