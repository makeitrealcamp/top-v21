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

export async function getProfileByToken({ token }) {
  const response = await http.get(
    `https://${process.env.REACT_APP_AUTH0_DOMAIN}/userinfo`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return response.data;
}

export async function updateUser(payload) {
  const response = await http.put(`/users/profile`, payload);
  const { data: json } = response;
  return {
    data: transformUser(json.data),
  };
}

export function syncAccount(payload, token) {
  return http.post(`/users/account`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
