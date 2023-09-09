import {
    DefaultLayout,
  } from "~/layouts/Index";
import Home from "~/pages/home/Index";
import Profile from "~/pages/profile/Index";
import Login from "~/pages/login/index";
import Register from "~/pages/register/index";
  
  const publicRouter = [
    {
      path: "/",
      page: Home,
      layout: DefaultLayout,
    },
    {
      path: "/login",
      page: Login,
      layout: null,
    },
    {
      path: "/register",
      page: Register,
      layout: null,
    },
  ];
  
  const privateRouter = [
    {
      path: "/profile",
      page: Profile,
      layout: DefaultLayout,
    },
  ];
  
  export { privateRouter, publicRouter };
  