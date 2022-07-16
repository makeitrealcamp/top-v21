import { useReducer } from 'react';

interface initialStateType {
  error: Error | null;
  loading: boolean;
}

type actionType =
  | { type: 'INIT' }
  | { type: 'FETCH' }
  | { type: 'FULLFILLED' }
  | { type: 'REJECTED'; payload: Error };

const initialState = {
  error: null,
  loading: false,
};

function reducer(state: initialStateType, action: actionType) {
  switch (action.type) {
    case 'INIT':
      return initialState;
    case 'FETCH':
      return {
        error: null,
        loading: true,
      };
    case 'FULLFILLED':
      return {
        ...state,
        loading: false,
      };
    case 'REJECTED':
      return {
        error: action.payload,
        loading: false,
      };
    default:
      throw new Error();
  }
}

type useFetchStatereturn = [initialStateType, React.Dispatch<actionType>];

export default function useFetchState(): useFetchStatereturn {
  const [{ error, loading }, dispatch] = useReducer(reducer, initialState);

  return [{ error, loading }, dispatch];
}
