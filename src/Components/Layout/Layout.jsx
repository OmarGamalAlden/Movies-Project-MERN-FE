import React from "react";
import Navbar from "../Navbar/Navbar.jsx";
import Footer from "../Footer/Footer.jsx";
import { Outlet, useNavigate } from "react-router-dom";

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

      {/* the children component will dispaly here... */}
      <Outlet></Outlet>

      <Footer />
    </>
  );
}
