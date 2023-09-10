import {configureStore} from "@reduxjs/toolkit";
import authSlide from "./authSlide";
import IconSlide from "./IconSlide";

export default configureStore({
    reducer:{
        auth: authSlide,
        icon: IconSlide
    }
})