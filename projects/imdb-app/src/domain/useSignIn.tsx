import { useLazyQuery } from '@apollo/client';
import { loader } from 'graphql.macro';
import { UserLogin } from '../containers/UserContext';

const query = loader('../graphql/users/signin.graphql');

type QueryResult = {
  signin: UserLogin & {
    token: string;
  };
};

export default function useSignIn() {
  return useLazyQuery<
    QueryResult,
    {
      email: string;
      password: string;
    }
  >(query);
}
