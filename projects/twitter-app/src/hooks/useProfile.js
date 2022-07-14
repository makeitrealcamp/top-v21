import useSWR from 'swr';
import { getProfileByToken } from '../api/users';

export default function useProfile({ token }) {
  const { data, error } = useSWR(token ? `/users/${token}` : null, () =>
    getProfileByToken({ token }),
  );

  return {
    data: data,
    error,
    loading: !error && !data,
  };
}
