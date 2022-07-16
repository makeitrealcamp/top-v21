import useSWR from 'swr';
import { getProfileByUsername } from '../api/users';

export default function useProfile({ username }) {
  const { data, error } = useSWR(username ? `/users/${username}` : null, () =>
    getProfileByUsername({ username }),
  );

  return {
    data: data?.data,
    error,
    loading: !error && !data,
  };
}
