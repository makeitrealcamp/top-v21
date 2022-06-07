import http from './http';

function transformUser(item) {
  return {
    username: item.username,
    firstname: item.firstname,
    lastname: item.lastname,
    name: item.name,
    email: item.email,
    description: item.description,
    location: item.location,
  };
}

export async function signIn({ email, password }) {
  return http.post(`/users/signin`, { email, password }).then((response) => {
    const { data: json } = response;

    if (json.meta?.token) {
      localStorage.setItem('token', json.meta.token);
    }

    return {
      data: transformUser(json.data),
    };
  });
}

export async function signUp(payload) {
  return http.post(`/users/signup`, payload).then((response) => {
    const { data: json } = response;
    return {
      data: transformUser(json.data),
    };
  });
}

export async function getProfileByUsername({ username }) {
  const response = await http.get(`/users/profile/${username}`);
  const { data: json } = response;
  return {
    data: transformUser(json.data),
  };
}

export async function updateUser(payload) {
  const response = await http.put(`/users/profile`, payload);
  const { data: json } = response;
  return {
    data: transformUser(json.data),
  };
}
