import {configureStore} from "@reduxjs/toolkit";
import authSlide from "./authSlide";

export default configureStore({
    reducer:{
        auth: authSlide
    }
})