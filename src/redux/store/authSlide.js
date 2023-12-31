import { createSlice } from '@reduxjs/toolkit'
import { logIn,logOut } from '../actions/authActions'
import { getValueLocalStorage } from '~/utils/contactWithLocalStorage'

const initialState = { 
  data_user:getValueLocalStorage('user_data') || null, 
  access_token: getValueLocalStorage('access_token') || null
}

console.log(initialState)
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.data_user = action.payload.data_user;
      state.access_token = action.payload.access_token;
    },
    logout: (state) => {
      state.data_user = null;
      state.access_token = null;
    },
    updateAccount: (state,action) =>{
      state.data_user = {
        ...state.data_user,
        ...action.payload
      }
    }
  },
  extraReducers: (builder) =>{
    builder.addCase(logIn.fulfilled,(state,action) =>{
      if(action.payload?.success){
        state.data_user = action.payload?.returnObj.data;
        state.access_token = action.payload?.returnObj.authentication.access_token;
      }else{
        state.data_user = null;
        state.access_token = null;
      }
    })
    builder.addCase(logOut.fulfilled,(state,action) =>{
      state.access_token = null;
      state.data_user = null;
    })
  }
})



export const { loginSuccess,logout, updateAccount } = authSlice.actions;

export default authSlice.reducer