import React, { useContext, useEffect } from "react";
import jwtDecode from "jwt-decode";
import { Offline } from "react-detect-offline";
import { RouterProvider, createHashRouter } from "react-router-dom";
import { AuthContext } from "./Context/AuthContext.js";
import Layout from "./Components/Layout/Layout.jsx";
import Home from "./Components/Home/Home.jsx";
import NotFoundPage from "./Components/NotFoundPage/NotFoundPage.jsx";
import TV from "./Components/TV/TV.jsx";
import Movies from "./Components/Movies/Movies.jsx";
import Signin from "./Components/Signin/Signin.jsx";
import Signup from "./Components/Signup/Signup.jsx";
import People from "./Components/People/People.jsx";
import Profile from "./Components/Profile/Profile.jsx";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute.jsx";
import ItemDeatils from "./Components/ItemDeatils/ItemDeatils.jsx";

export default function App() {
  let { userData, setUserData } = useContext(AuthContext);
  useEffect(() => {
    //solve the problem of loading website!!
    if (localStorage.getItem("token") !== null) {
      saveUserData();
    }
  }, []);

  function saveUserData() {
    const token = localStorage.getItem("token");
    const decoded_token = jwtDecode(token);
    setUserData(decoded_token);
  }

  let router = createHashRouter([
    {
      path: "/",
      element: <Layout setUserData={setUserData} userData={userData} />,
      children: [
        {
          path: "home",
          element: (
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          ),
        },
        {
          path: "tv",
          element: (
            <ProtectedRoute>
              <TV />
            </ProtectedRoute>
          ),
        },
        {
          path: "movies",
          element: (
            <ProtectedRoute>
              <Movies />
            </ProtectedRoute>
          ),
        },
        {
          path: "itemdeatils/:mediaType/:id",
          element: (
            <ProtectedRoute>
              <ItemDeatils />
            </ProtectedRoute>
          ),
        },
        {
          path: "profile",
          element: (
            <ProtectedRoute>
              <Profile userData={userData} />
            </ProtectedRoute>
          ),
        },
        {
          path: "person",
          element: (
            <ProtectedRoute>
              <People />
            </ProtectedRoute>
          ),
        },
        { path: "signin", element: <Signin saveUserData={saveUserData} /> },
        { index: true, element: <Signup /> },
        { path: "*", element: <NotFoundPage /> },
      ],
    },
  ]);
  return (
    <>
      <Offline>
        {" "}
        <div className="offline">YOU ARE OFFLINE!!</div>{" "}
      </Offline>
      <RouterProvider router={router} />
    </>
  );
}
