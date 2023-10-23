import axios from "axios";
import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { Link, useNavigate } from "react-router-dom";

export default function Signup() {
  let baseURL = "https://noxe-project-mern-be.vercel.app";
  let navigate = useNavigate();
  const [isLoading, SetIsLoading] = useState(false); //loading button
  const [errors, setErrors] = useState([]); //for errorsmessages
  const [successMsg, setSuccessMsg] = useState(""); //for successful messages
  const [user, setUser] = useState({
    userName: "",
    email: "",
    age: 0,
    password: "",
    cPassword: "",
    role: "",
  });

  function getUserData(e) {
    let myUser = { ...user };
    myUser[e.target.name] = e.target.value;
    setUser(myUser);
    setErrors([]);
  }
  async function sendUserDataToAPI() {
    await axios({
      url: `${baseURL}/auth/signup`,
      method: "post",
      data: user,
      headers: { "Content-Type": "application/json; charset=UTF-8" },
    })
      .then((response) => {
        SetIsLoading(false);
        const { data } = response;
        setSuccessMsg(data.message);
        //if success convert user to login page
        setTimeout(() => {
          navigate("/signin"); //wait for 4 seconads before convert the user..
        }, "4000");
      })
      .catch((error) => {
        SetIsLoading(false);
        const { data } = error.response;
        let errorsCollection = [];
        if (data.error) {
          let message = data.error;
          errorsCollection.push(message);
          setErrors(errorsCollection);
        }
        if (data.validationResult) {
          data.validationResult.map((err) => {
            return errorsCollection.push(err.message);
          });
          setErrors(errorsCollection);
        }
      });
  }
  function submitUserData(e) {
    SetIsLoading(true);
    e.preventDefault();
    sendUserDataToAPI();
  }

  return (
    <>
      <Helmet>
        <meta charset="utf-8" />
        <title> Signup Page </title>
      </Helmet>
      <div className="container">
        <div className="row my-5">
          <div className="input-form w-75 m-auto">
            {/* Handling the errors messages */}
            <div className="row justify-content-center">
              {errors.length
                ? errors.map((err, index) => {
                    return (
                      <div
                        key={index}
                        className="col-md-3 gy-2 mx-2 text-center alert alert-danger my-2"
                      >
                        {err}
                      </div>
                    );
                  })
                : ""}
            </div>
            {/* Handling the success messages */}
            <div className="row justify-content-center">
              {successMsg.length ? (
                <div className="col-md-6 text-center alert alert-success my-2">
                  {successMsg}
                </div>
              ) : (
                ""
              )}
            </div>

            <form className="my-3 form" onSubmit={submitUserData}>
              <label htmlFor="userName">User Name:</label>
              <input
                onChange={getUserData}
                className="form-control my_input py-2"
                type="text"
                id="userName"
                name="userName"
              />

              <label htmlFor="email">Email:</label>
              <input
                onChange={getUserData}
                className="form-control my_input py-2"
                type="email"
                id="email"
                name="email"
              />

              <label htmlFor="age">Age:</label>
              <input
                onChange={getUserData}
                className="form-control my_input py-2"
                type="number"
                id="age"
                name="age"
              />

              <label htmlFor="role">Role:</label>
              <select
                onChange={getUserData}
                className="form-control my_input py-2"
                name="role"
                id="role"
              >
                <option value="">--Please choose an option--</option>
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>

              <label htmlFor="password">Password:</label>
              <input
                onChange={getUserData}
                className="form-control my_input py-2"
                type="password"
                id="password"
                name="password"
              />

              <label htmlFor="cPassword">Confirm Password:</label>
              <input
                onChange={getUserData}
                className="form-control my_input py-2"
                type="password"
                id="cPassword"
                name="cPassword"
              />

              <div className="form-links d-flex justify-content-between align-items-center">
                <button type="submit" className="btn btn-info my-4">
                  {isLoading ? (
                    <i className="fas fa-spinner fa-spin"></i>
                  ) : (
                    "Register"
                  )}
                </button>
                <Link className="text-decoration-underline " to={"/signin"}>
                  {" "}
                  Already registered? Please, signin...{" "}
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
