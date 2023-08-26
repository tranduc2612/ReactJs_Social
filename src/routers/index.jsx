import {
    DefaultLayout,
  } from "~/layouts/Index";
  import Home from "~/pages/home/Index";
  import Profile from "~/pages/profile/Index"
  
  const publicRouter = [
    {
      path: "/",
      page: Home,
      layout: DefaultLayout,
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
  