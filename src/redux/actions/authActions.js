import { createAsyncThunk } from '@reduxjs/toolkit'
import * as request from "~/services/base"
import checkResponse from '~/utils/checkResponse';
import { removeAllKeyAuthentication, setValueToLocalStorage } from '~/utils/contactWithLocalStorage';

export const logIn = createAsyncThunk(
  'auth/logIn',
  async (payload,options) => {
    // Đoạn này đóng vai trò như gọi từ service
    try{
      const data = await request.Post("/login",payload);
      if(checkResponse(data)){
        const response = data?.returnObj;
        setValueToLocalStorage("access_token",response.authentication.access_token);
        setValueToLocalStorage("token_type",response.authentication.token_type);
        setValueToLocalStorage("user_data",response.data);
      }
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
      
      return true;
      
    }catch(ex){
      if(ex.response.status === 401){
        
      }
      console.log(ex)
    }
    //
  }
)