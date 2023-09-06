import {
    DefaultLayout,
  } from "~/layouts/Index";
  import Home from "~/pages/home/Index";
  import Profile from "~/pages/profile/Index";
  import Login from "~/pages/login/index";
  
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
  ];
  
  const privateRouter = [
    {
      path: "/profile",
      page: Profile,
      layout: DefaultLayout,
    },
  ];
  
  export { privateRouter, publicRouter };
  