import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  currentPage: "Statistics"
}


export const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    changePage: (state, action) => {

        state.currentPage = action.payload
    }
  },
})

export const { changePage } = dashboardSlice.actions

export default dashboardSlice.reducer