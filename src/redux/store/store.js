import {configureStore,getDefaultMiddleware} from "@reduxjs/toolkit";
import authSlide from "./authSlide";
import IconSlide from "./IconSlide";
import authMiddleware from '../middleware/authMiddleware';


export default configureStore({
    reducer:{
        auth: authSlide,
        icon: IconSlide
    }
})