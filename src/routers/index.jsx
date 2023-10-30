import {
  DefaultLayout,
} from "../layouts/Index";
import Home from "../pages/home/Index";
import Profile from "../pages/profile/Index";
import Login from "../pages/login/index";
import Register from "../pages/register/index";
import Messenger from "../pages/messenger/Index"
import Search from "../pages/search/Index";

const publicRouter = [
  {
    path: "/login",
    page: Login,
    layout: null,
    auth: true // nếu mà là false thì sau khi đăng nhập sẽ không được vào được trang này nữa
  },
  {
    path: "/register",
    page: Register,
    layout: null,
    auth: true // nếu mà là false thì sau khi đăng nhập sẽ không được vào được trang này nữa
  },
];

const privateRouter = [
  {
    path: "/profile/:id",
    page: Profile,
    layout: DefaultLayout,
  },
  {
    path: "/messenger/:id",
    page: Messenger,
    layout: DefaultLayout,
  },
  {
    path: "/messenger",
    page: Messenger,
    layout: DefaultLayout,
  },
  {
    path: "/search",
    page: Search,
    layout: DefaultLayout,
  },
  {
    path: "/",
    page: Home,
    layout: DefaultLayout,
  },
];

export { privateRouter, publicRouter };
