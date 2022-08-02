import useSWR from 'swr';
import { getUsers } from '../api/users';

export default function useUsers() {
  const { data, error } = useSWR(`/users`, getUsers);

  return {
    data: data?.data,
    error: error,
    loading: !error && !data,
  };
}
