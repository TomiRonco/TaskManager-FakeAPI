import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";

import { AuthenticationContextProvider } from "./service/authenticationContext/authentication.context";
import App from "./App";
import { TranslateContextProvider } from "./service/translationContext/translation.context";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <TranslateContextProvider>
    <AuthenticationContextProvider>
      <App />
    </AuthenticationContextProvider>
  </TranslateContextProvider>
);
