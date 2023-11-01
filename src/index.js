import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App";
import { AuthenticationContextProvider } from "./services/authenticationContext/authentication.context";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthenticationContextProvider>
    <App />
  </AuthenticationContextProvider>
);
