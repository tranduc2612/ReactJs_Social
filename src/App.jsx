import { Fragment, useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { privateRouter, publicRouter } from "~/routers/index";
import { DefaultLayout } from "./layouts/Index";
import { logIn, logOut } from "./redux/actions/authActions";
import { useSelector, useDispatch } from 'react-redux'
import NotFound from "./pages/notfound/Index";
import { Navigate } from 'react-router-dom';
// import { getValueLocalStorage, setValueToLocalStorage } from '~/utils/contactWithLocalStorage'
// import { Get } from '~/services/base';
// import checkResponse from '~/utils/checkResponse';
// import { loginSuccess, logout } from "./redux/store/authSlide";


function App() {
  // const [initialCheckDone, setInitialCheckDone] = useState(false);
  const userData = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   const checkTokenLogin = async () => {
  //     const tokenLocal = getValueLocalStorage('access_token');
  //     const checkLogin = await Get("/check-login", {}, tokenLocal);

  //     if (checkResponse(checkLogin)) {
  //       setValueToLocalStorage('user_data', checkLogin?.returnObj);
  //       dispatch(loginSuccess({
  //         data_user: checkLogin?.returnObj,
  //         access_token: getValueLocalStorage('access_token'),
  //       }));
  //     } else {
  //       dispatch(logout({
  //         data_user: null,
  //         access_token: null,
  //       }));
  //     }
  //   };
  //   if (!initialCheckDone) {
  //     setInitialCheckDone(true);
  //     checkTokenLogin();
  //   }
  // }, [dispatch]);

  return (
    <>
      <Router>
        <Routes>
          {publicRouter.map((route, index) => {
            const Page = route.page;

            let Layout = DefaultLayout;
            if (route.layout) {
              Layout = route.layout;
            } else if (route.layout === null) {
              Layout = Fragment;
            }

            return (
              <Route
                key={index}
                path={route.path}
                element={
                  userData.access_token && userData.data_user && route.auth && (route.path == "/login" || route.path == "/register") ?
                    <Navigate to="/" />
                    :
                    <Layout>
                      <Page userData={userData} />
                    </Layout>
                }
              />
            );
          })}

          {privateRouter.map((route, index) => {
            const Page = route.page;
            const Layout = route.layout || DefaultLayout;
            return (
              <Route
                key={index}
                path={route.path}
                element={
                  userData.access_token && userData.data_user ?
                    <Layout>
                      <Page userData={userData} />
                    </Layout>
                    :
                    <Navigate to="/login" />
                }
              />
            );
          })}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
