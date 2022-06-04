const initialState = {
  username: '',
  name: '',
  email: '',
};

export function userReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_USER':
      return action.payload;
    default:
      return state;
  }
}

export function getUser(state) {
  return state.user;
}
