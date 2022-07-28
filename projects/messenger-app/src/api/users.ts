import http from './http';
import type { User } from './types';

interface signInParams {
  email: string;
  password: string;
}

export async function signIn({ email, password }: signInParams) {
  return http.post(`/users/signin`, { email, password }).then((response) => {
    const { data: json } = response;

    if (json.meta?.token) {
      localStorage.setItem('token', json.meta.token);
    }

    const user: User = json.data;
    return {
      data: user,
    };
  });
}

type signUpParams = Record<string, string>;

export async function signUp(payload: signUpParams) {
  return http.post(`/users/signup`, payload).then((response) => {
    const { data: json } = response;
    const user: User = json.data;
    return {
      data: user,
    };
  });
}
