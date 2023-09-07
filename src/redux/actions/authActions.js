import { createAsyncThunk } from '@reduxjs/toolkit'
import * as request from "~/services/base"

export const logIn = createAsyncThunk(
  'auth/logIn',
  async (payload,options) => {
    // Đoạn này đóng vai trò như gọi từ service
    try{
      const data = await request.post("auth/login",payload);
      window.localStorage.setItem('token',data.access_token);
      return data;
    }catch(ex){
      console.log(ex)
    }
    //
  }
)

export const logOut = createAsyncThunk(
  'auth/authentication',
  async (payload,options) => {
    // Đoạn này đóng vai trò như gọi từ service
    try{
      window.localStorage.removeItem('token');
    }catch(ex){
      console.log(ex)
    }
    //
  }
)