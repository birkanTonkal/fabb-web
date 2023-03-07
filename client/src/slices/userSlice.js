import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isLoggedIn: false,
  user: {},
  user_type: null,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload;
      state.user_type = action.payload.user_type;
    },
    logout: (state, action) => {
        state.isLoggedIn = false;
        state.user = {};
        state.user_type = null;
    },
  },
})

export const { login, logout } = userSlice.actions

export default userSlice.reducer