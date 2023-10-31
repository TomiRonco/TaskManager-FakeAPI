import { useContext, useState } from "react";
import { AuthenticationContext } from "../../service/authenticationContext/authentication.context";
import { useNavigate } from "react-router";
import { BiUserCircle } from "react-icons/bi";
import { FaTasks } from "react-icons/fa";

import "./DashBoard.css";
import NewTask from "../newTask/NewTask";

const DashBoard = () => {
  const [componentToShow, setComponentToShow] = useState(null);

  const { handleLogout } = useContext(AuthenticationContext);

  const navigate = useNavigate();

  const handleLogoutInDashBoard = () => {
    handleLogout();
    navigate("/login");
  };

  const componentChangeHandler = (component) => {
    setComponentToShow(component);
  };

  return (
    <div className="dashboard">
      <nav className="navbars">
        <div className="logo">
          <FaTasks size={30} />
        </div>
        <div className="navbars-icons">
          <BiUserCircle size={40} color="white" />
        </div>
      </nav>
      <div className="column">
        <div className="column1">
          <div className="menu">
            <button
              className="button-dashboard"
              onClick={() => componentChangeHandler(<NewTask />)}
            >
              Agregar tarea
            </button>
          </div>
        </div>
        <div className="column2">{componentToShow}</div>
      </div>
    </div>
  );
};

export default DashBoard;
