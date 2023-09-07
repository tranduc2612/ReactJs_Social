import { createSlice } from '@reduxjs/toolkit'
import { logIn,logOut } from '../actions/authActions'

const initialState = {
  access_token: window.localStorage.getItem('token') || null,
  refresh_token: null
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    
  },
  extraReducers: (builder) =>{
    builder.addCase(logIn.fulfilled,(state,action) =>{
      // console.log("toot",state.token,action)
      state.access_token = action.payload.access_token,
      state.refresh_token = action.payload.refresh_token
    }),
    builder.addCase(logOut.fulfilled,(state,action) =>{
      // console.log("toot",state.token,action)
      state.access_token = null,
      state.refresh_token = null
    })
  }
})

export default authSlice.reducer