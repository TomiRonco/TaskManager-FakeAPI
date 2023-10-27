import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";

import { AuthenticationContextProvider } from "./service/authenticationContext/authentication.context";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthenticationContextProvider>
    <App />
  </AuthenticationContextProvider>
);
