export async function signIn({ email, password }) {
  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/users/signin`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    },
  );

  if (response.ok) {
    const json = await response.json();

    return json;
  } else {
    return Promise.reject('Network Error');
  }
}

export async function signUp(payload) {
  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/users/signup`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    },
  );

  if (response.ok) {
    const json = await response.json();

    return json;
  } else {
    return Promise.reject('Network Error');
  }
}
