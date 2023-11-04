import React, { useContext, useState } from "react";
import { AuthenticationContext } from "../../services/authenticationContext/authentication.context";
import { useNavigate, useLocation } from "react-router-dom";

import "./DashBoard.css";

import { Link } from "react-router-dom";

const DashBoard = ({ children }) => {
  const { handleLogout } = useContext(AuthenticationContext);
  const navigate = useNavigate();
  const location = useLocation();

  const [language, setLanguage] = useState("Es");

  const handleLanguageToggle = () => {
    if (language === "Es") {
      setLanguage("En");
    }
  };

  const handleLogoutInDashboard = () => {
    localStorage.clear();
    handleLogout();
    navigate("/login");
  };

  return (
    <div className="vh-100 custom-background">
      <nav className="navbar custom-nav">
        <div className="d-flex ms-5 custom-nav-link">
          <Link
            to="/home/userList"
            className={`nav-link ${
              location.pathname === "/home/userList" ? "active" : ""
            } me-3`}
          >
            Lista de usuario
          </Link>

          <Link
            to="/home/addTask"
            className={`nav-link ${
              location.pathname === "/home/addTask" ? "active" : ""
            } me-3`}
          >
            Crear tarea
          </Link>
          <Link
            to="/home/listTask"
            className={`nav-link ${
              location.pathname === "/home/listTask" ? "active" : ""
            } me-3`}
          >
            Ver mis tareas
          </Link>
        </div>
        <div>
          <button
            className="btn btn-violet me-2"
            onClick={handleLanguageToggle}
          >
            {language}
          </button>
          <button
            className="btn btn-violet me-5"
            onClick={handleLogoutInDashboard}
          >
            Cerrar sesión
          </button>
        </div>
      </nav>
      <div>
        <div className="w-100 d-flex justify-content-center p-5">
          {children}
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
