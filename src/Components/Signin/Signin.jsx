import axios from "axios";
import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";

export default function Signin({ saveUserData }) {
  let baseURL = "https://noxe-project-mern-be.vercel.app";
  let navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [resError, setResError] = useState([]);
  const [successMessage, setSuccessMessage] = useState([]);
  const [userDeatils, setUserDeatils] = useState({
    email: "",
    password: "",
  });
  function getLoginData(e) {
    let myUser = { ...userDeatils };
    myUser[e.target.name] = e.target.value;
    setUserDeatils(myUser);
    setResError([]);
  }
  async function sendUserDataToAPI() {
    await axios({
      url: `${baseURL}/auth/signin`,
      method: "post",
      data: userDeatils,
      headers: { "Content-Type": "application/json; charset=UTF-8" },
    })
      .then((response) => {
        setIsLoading(false);
        let { data } = response;
        let successCollection = [];
        if (data) {
          successCollection.push(data.message);
          setSuccessMessage(successCollection);
          localStorage.setItem("token", data.token);
          saveUserData();
          navigate("/home");
        }
      })
      .catch(({ response }) => {
        setIsLoading(false);
        let { data } = response;
        let errorCollection = [];
        if (data.validationResult) {
          data.validationResult.map((err) => {
            return errorCollection.push(err.message);
          });
          setResError(errorCollection);
        }
        if (data.error) {
          errorCollection.push(data.error);
          setResError(errorCollection);
        }
      });
  }
  function submitSiginData(e) {
    setIsLoading(true);
    e.preventDefault();
    sendUserDataToAPI();
  }
  return (
    <>
      <Helmet>
        <meta charset="utf-8" />
        <title> Login Page </title>
      </Helmet>
      <div className="container container-signin d-flex justify-content-center align-items-center">
        <div className="row w-100">
          <div className="input-form w-75 m-auto">
            {/* Handling the errors messages */}
            <div className="row justify-content-center">
              {resError.length
                ? resError.map((err, index) => {
                    return (
                      <div
                        key={index}
                        className="col-md-3 text-center mx-3 alert alert-danger"
                      >
                        {err}
                      </div>
                    );
                  })
                : ""}
            </div>

            {/* Handling the success messages */}
            <div className="row justify-content-center">
              {successMessage.length
                ? successMessage.map((msg, index) => {
                    return (
                      <div
                        key={index}
                        className="col-md-6 text-center mx-3 alert alert-success"
                      >
                        {msg}
                      </div>
                    );
                  })
                : ""}
            </div>

            <form className="my-4" onSubmit={submitSiginData}>
              <label htmlFor="email">Your Email</label>
              <input
                onChange={getLoginData}
                type="email"
                id="email"
                name="email"
                className="my_input form-control"
              />

              <label htmlFor="password">Password</label>
              <input
                onChange={getLoginData}
                type="password"
                id="password"
                name="password"
                className="my_input form-control"
              />
              <button className="btn btn-info my-4" type="submit">
                {isLoading ? (
                  <i className="fas fa-spinner fa-spin"></i>
                ) : (
                  "LogIn"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
