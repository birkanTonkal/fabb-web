import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isLoggedIn: false,
  user: {},
  user_type: null,
}


export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginUser: (state, action) => {
      console.log(action)
      state.isLoggedIn = true;
      state.user = action.payload;
      state.user_type = action.payload.user_type;
      localStorage.setItem("isLoggedIn", true);
    },
    logoutUser: (state, action) => {
        state.isLoggedIn = false;
        state.user = {};
        state.user_type = null;
        localStorage.setItem("isLoggedIn", false);
    },
  },
})

export const { loginUser, logoutUser } = authSlice.actions

export default authSlice.reducer