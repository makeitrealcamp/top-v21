import { useQuery, useMutation } from '@apollo/client';
import { loader } from 'graphql.macro';
import { Actor } from '../graphql/types';

const query = loader('../graphql/actors/actors.graphql');
const mutation = loader('../graphql/actors/createActor.graphql');

interface QueryResult {
  actors: Actor[];
}

interface MutationResult {
  createActor: Actor;
}

interface MutationVariables {
  input: {
    name: string;
  };
}

export default function useActors() {
  const { data, error, loading, refetch } = useQuery<QueryResult>(query);

  const [
    create,
    { data: createData, error: createError, loading: createLoading },
  ] = useMutation<MutationResult, MutationVariables>(mutation);

  return {
    data,
    error,
    loading,
    refetch,
    actions: {
      create: {
        apply: create,
        data: createData,
        error: createError,
        loading: createLoading,
      },
    },
  };
}
