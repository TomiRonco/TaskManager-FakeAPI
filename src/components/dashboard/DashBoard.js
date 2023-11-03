import { useContext } from "react";
import { AuthenticationContext } from "../../services/authenticationContext/authentication.context";
import { useNavigate } from "react-router";

import "./DashBoard.css";

const DashBoard = ({ children }) => {
  const { handleLogout } = useContext(AuthenticationContext);

  const navigate = useNavigate();

  const handleLogoutInDashboard = () => {
    localStorage.clear();
    handleLogout();
    navigate("/login");
  };

  return (
    <div className="vh-100 d-flex flex-column custom-background">
      <nav className="navbar d-flex justify-content-end custom-nav">
        <button
          className="btn btn-violet me-5"
          onClick={handleLogoutInDashboard}
        >
          Cerrar sesión
        </button>
      </nav>
      <div className="flex-grow-1 row m-0">
        <div className="col-2 p-0 d-flex flex-column align-items-center gap-3 column1-custom">
          <button
            className="btn btn-violet mt-5 w-75"
            onClick={() => navigate("/home/listTask")}
          >
            Lista de tareas
          </button>
          <button
            className="btn btn-violet mt-5 w-75"
            onClick={() => navigate("/home/addTask")}
          >
            Crear tarea
          </button>
        </div>
        <div className="col-10 p-0">
          <div className="d-flex justify-content-center align-items-center m-auto">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
