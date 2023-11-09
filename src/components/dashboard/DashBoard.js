import React, { useContext } from "react";
import { AuthenticationContext } from "../../services/authenticationContext/authentication.context";
import { useNavigate, useLocation } from "react-router-dom";
import useTranslation from "../../custom/useTranslation/useTranslation";

import "./DashBoard.css";

import { Link } from "react-router-dom";
import ComboLanguage from "../ui/comboLanguage/ComboLanguage";

const DashBoard = ({ children }) => {
  const { handleLogout } = useContext(AuthenticationContext);
  const navigate = useNavigate();
  const location = useLocation();
  let user = localStorage.getItem("user");
  user = JSON.parse(user);

  const translate = useTranslation();

  const handleLogoutInDashboard = () => {
    localStorage.clear();
    handleLogout();
    navigate("/login");
  };

  return (
    <div className="vh-100 custom-background">
      <nav className="navbar custom-nav">
        <div className="d-flex ms-5 custom-nav-link">
          {user.userType === "superAdmin" && (
            <Link
              to="/home/userList"
              className={`nav-link ${
                location.pathname === "/home/userList" ? "active" : ""
              } me-3`}
            >
              {translate("user_List")}
            </Link>
          )}

          {user.userType === "superAdmin" && (
            <Link
              to="/home/addTask"
              className={`nav-link ${
                location.pathname === "/home/addTask" ? "active" : ""
              } me-3`}
            >
              {translate("create_task")}
            </Link>
          )}
          {user.userType === "Admin" && (
            <Link
              to="/home/addTask"
              className={`nav-link ${
                location.pathname === "/home/addTask" ? "active" : ""
              } me-3`}
            >
              {translate("create_task")}
            </Link>
          )}
          <Link
            to="/home/listTask"
            className={`nav-link ${
              location.pathname === "/home/listTask" ? "active" : ""
            } me-3`}
          >
            {translate("tasks")}
          </Link>
        </div>
        <div className="d-flex">
          <ComboLanguage />
          <button
            className="btn btn-violet me-5"
            onClick={handleLogoutInDashboard}
          >
            {translate("sign_off")}
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
