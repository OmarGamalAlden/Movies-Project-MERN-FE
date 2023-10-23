import React from "react";
import { Link } from "react-router-dom";

export default function Navbar({ userData, logOut }) {
  return (
    <>
      <nav className="p-2 d-flex justify-content-between align-items-center">
        <div className="right-nav d-flex align-items-center">
          <h3 className="m-0 mx-3">Noxe</h3>
          <span className="mainBtn rounded-2">
            <span></span> <span className="hover"></span> <span></span>
          </span>
          {userData ? (
            <ul className="links_list m-0 list-unstyled d-flex">
              <li className="px-2">
                {" "}
                <Link to="home">Home</Link>{" "}
              </li>
              <li className="px-2">
                {" "}
                <Link to="movies">Movies</Link>{" "}
              </li>
              <li className="px-2">
                {" "}
                <Link to="tv">Tv show</Link>{" "}
              </li>
              <li className="px-2">
                {" "}
                <Link to="person">People</Link>{" "}
              </li>
            </ul>
          ) : (
            ""
          )}
        </div>

        <div className="left-nav d-flex align-items-center">
          <div className="social-media mx-4">
            <a target="_blanc" href="https://github.com/OmarGamalAlden">
              <i className="fab mx-2 fa-github"></i>
            </a>
            <a
              target="_blanc"
              href="https://www.linkedin.com/in/omargamalalden"
            >
              <i className="fab mx-2 fa-linkedin"></i>
            </a>
          </div>
          <ul className="m-0 list-unstyled d-flex align-items-center">
            {userData ? (
              <>
                <li className="px-2">
                  {" "}
                  <Link to="profile">Profile</Link>{" "}
                </li>
                <li className="px-2 cursor_pointer" onClick={logOut}>
                  {" "}
                  <span>logOut</span>{" "}
                </li>
              </>
            ) : (
              <>
                <li className="px-2">
                  {" "}
                  <Link to="signin">Login</Link>{" "}
                </li>
                <li className="px-2">
                  {" "}
                  <Link to="/">Signup</Link>{" "}
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
    </>
  );
}
