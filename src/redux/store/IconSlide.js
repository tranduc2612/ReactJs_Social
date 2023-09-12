import { createSlice } from '@reduxjs/toolkit'
import { logIn,logOut } from '../actions/authActions'

const initialState = {};

const iconSlide = createSlice({
  name: 'icon',
  initialState,
  reducers: {
    getListIcon: function(){
        return initialState
    }
  },
})

export default iconSlide.reducer