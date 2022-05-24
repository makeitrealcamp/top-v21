import http from './http';

export async function signIn({ email, password }) {
  return http.post(`/users/signin`, { email, password }).then((response) => {
    const { data: json } = response;
    return json;
  });
}

export async function signUp(payload) {
  return http.post(`/users/signup`, payload).then((response) => {
    const { data: json } = response;
    return {
      data: json.data,
    };
  });
}
