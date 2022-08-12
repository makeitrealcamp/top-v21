import React from 'react';
import { gql, useQuery } from '@apollo/client';

const GET_MOVIES = gql`
  query GetMovies {
    movies {
      id
      title
    }
  }
`;

export default function Home() {
  const { data } = useQuery(GET_MOVIES);
  return (
    <>{data?.movies && <pre>{JSON.stringify(data.movies, null, 2)}</pre>}</>
  );
}
