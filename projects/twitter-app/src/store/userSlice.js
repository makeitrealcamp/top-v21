import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  username: '',
  name: '',
  email: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState: {
    currentUser: initialState,
  },
  reducers: {
    setUser(state, action) {
      state.currentUser = action.payload;
    },
  },
});

export const getUser = (state) => state.user?.currentUser;

export const { setUser } = userSlice.actions;

export default userSlice;
