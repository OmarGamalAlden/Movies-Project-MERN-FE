import React from "react";
import Navbar from "../Navbar/Navbar.jsx";
import Footer from "../Footer/Footer.jsx";
import { Outlet, ScrollRestoration, useNavigate } from "react-router-dom";

export default function Layout({ userData, setUserData }) {
  let navigate = useNavigate();
  function logOut() {
    localStorage.removeItem("token");
    setUserData(null);
    navigate("/signin");
  }
  return (
    <>
      <Navbar logOut={logOut} userData={userData} />

      {/* Allow user to goback to the samepoint */}
      <ScrollRestoration
        getKey={(location) => {
          const paths = [
            "/",
            "/home",
            "/movies",
            "/tv",
            "/itemdeatils",
            "/profile",
          ];
          return paths.includes(location.pathname)
            ? location.pathname
            : location.key;
        }}
      />

      {/* the children component will dispaly here... */}
      <Outlet></Outlet>

      <Footer />
    </>
  );
}
