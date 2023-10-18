import {configureStore,getDefaultMiddleware} from "@reduxjs/toolkit";
import authSlide from "./authSlide";
import IconSlide from "./IconSlide";
import postSlide from "./postSlide";


export default configureStore({
    reducer:{
        auth: authSlide,
        icon: IconSlide,
        post: postSlide,
    }
})