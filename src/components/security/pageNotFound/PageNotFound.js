import React from "react";
import { useNavigate } from "react-router";

const PageNotFound = () => {
  const navigate = useNavigate();

  const backToHomePageHandler = () => {
    navigate("/login");
  };
  return (
    <div className="text-center">
      <h2 className="my-4">¡Oops! La página solicitada no fue encontrada</h2>
      <button onClick={backToHomePageHandler}>Volver a iniciar sesión</button>
    </div>
  );
};

export default PageNotFound;
