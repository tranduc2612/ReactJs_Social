import { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { privateRouter, publicRouter } from "~/routers/Index";
import { DefaultLayout } from "~/layouts/Index";
import { logIn,logOut } from "./redux/actions/authActions";
import { useSelector, useDispatch } from 'react-redux'
import NotFound from "~/pages/notfound/Index";
import * as req from "~/services/base"


function App() {
  let isLogin = false;
  const data = useSelector((state) => state.auth)
  const dispatch = useDispatch();

  useEffect(()=>{
    console.log(data)
  },[data])

  const handleLogin = () =>{
    // cách đăng nhập đây
    dispatch(logIn({
      email: "john@mail.com",
      password: "changeme"
    }))
  }

  const handleLogOut = () =>{
    // cách đăng nhập đây
    dispatch(logOut())
  }


  return (
    <>
      {/* fake login */}
      {/* <button style={{
        position: "absolute",
        backgroundColor: "red",
        fontSize: "6rem",
        top: "50%",
        left: "50%",
      }} onClick={handleLogin}>Login</button>

      <button style={{
        position: "absolute",
        backgroundColor: "red",
        fontSize: "6rem",
        top: "50%",
        left: "30%",
      }} onClick={handleLogOut}>Log out</button> */}


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
                <Layout>
                  <Page />
                </Layout>
              }
            />
          );
        })}

        {data.access_token &&
          privateRouter.map((route, index) => {
            const Page = route.page;
            const Layout = route.layout || DefaultLayout;
            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <Layout>
                    <Page />
                  </Layout>
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
