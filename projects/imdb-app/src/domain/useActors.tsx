import { useQuery } from '@apollo/client';
import { loader } from 'graphql.macro';
import { Actor } from '../graphql/types';

const query = loader('../graphql/actors/actors.graphql');

type QueryResult = {
  actors: Actor[];
};

export default function useActors() {
  return useQuery<QueryResult>(query);
}
