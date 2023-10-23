import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.js";
// import bootstarp files
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
// import fontawesomr files
import "@fortawesome/fontawesome-free/css/all.min.css";
//import main file css
import "./index.css";
import AuthContextProvider from "./Context/AuthContext.js";
import MediaContextProvider from "./Context/MediaContext.js";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthContextProvider>
    <MediaContextProvider>
      <App />
    </MediaContextProvider>
  </AuthContextProvider>
);
