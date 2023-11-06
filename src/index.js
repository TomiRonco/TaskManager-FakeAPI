import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App";
import { AuthenticationContextProvider } from "./services/authenticationContext/authentication.context";
import { TranslateContextProvider } from "./services/translationContext/translation.context";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <TranslateContextProvider>
    <AuthenticationContextProvider>
      <App />
    </AuthenticationContextProvider>
  </TranslateContextProvider>
);
