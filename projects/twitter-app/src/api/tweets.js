function transformTweet(item) {
  return {
    id: item._id,
    user: {
      username: item.userId.username,
      name: item.userId.name,
    },
    content: item.content,
    date: item.createdAt,
  };
}

export async function getTweets() {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/tweets`);

  if (response.ok) {
    const json = await response.json();

    const transformedData = json.data.map((item) => {
      return transformTweet(item);
    });

    return {
      data: transformedData,
      meta: json.meta,
    };
  } else {
    return Promise.reject('Network Error');
  }
}

export async function getTweet({ id }) {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/tweets/${id}`);

  if (response.ok) {
    const json = await response.json();

    const transformedData = transformTweet(json.data);

    return {
      data: transformedData,
    };
  } else {
    return Promise.reject('Network Error');
  }
}
