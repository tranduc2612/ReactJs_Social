import { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { privateRouter, publicRouter } from "~/routers/index";
import { DefaultLayout } from "./layouts/Index";
import { logIn, logOut } from "./redux/actions/authActions";
import { useSelector, useDispatch } from 'react-redux'
import NotFound from "./pages/notfound/Index";
import { Navigate } from 'react-router-dom';

function App() {
  const userData = useSelector((state) => state.auth);
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
                  userData.access_token && userData.data_user && route.auth ?
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
