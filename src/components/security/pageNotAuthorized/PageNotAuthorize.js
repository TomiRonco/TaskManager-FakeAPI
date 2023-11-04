import React from "react";
import { useNavigate } from "react-router";

import "./PageNotAuthorize.css";

const PageNotAuthorize = () => {
  const navigate = useNavigate();

  const backToHomePageHandler = () => {
    navigate("/home");
  };

  return (
    <div className="vh-100 d-flex justify-content-center align-items-center background-custom">
      <div className="text-white text-center">
        <h2>¡Oops! No tienes acceso a esta sección</h2>
        <button className="btn btn-violet" onClick={backToHomePageHandler}>
          Volver a la página principal
        </button>
      </div>
    </div>
  );
};

export default PageNotAuthorize;
