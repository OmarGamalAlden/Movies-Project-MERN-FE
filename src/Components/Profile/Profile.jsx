import React from "react";
import { Helmet } from "react-helmet";

export default function Profile({ userData }) {
  let { userName, age, email, id } = userData;
  return (
    <>
      <Helmet>
        <meta charset="utf-8" />
        <title> User Profile Page </title>
      </Helmet>
      <div className="user_deatils text-center position-absolute top-50 start-50">
        <h4>ID: {id}</h4>
        <h4>Name: {userName}</h4>
        <h4>Age: {age}</h4>
        <h4>Email: {email}</h4>
      </div>
    </>
  );
}
