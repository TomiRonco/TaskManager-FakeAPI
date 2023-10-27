import { useContext } from "react";
import { AuthenticationContext } from "../../service/authenticationContext/authentication.context";
import { useNavigate } from "react-router";

const DashBoard = () => {
  const { handleLogout, user } = useContext(AuthenticationContext);

  const navigate = useNavigate();

  const handleLogoutInDashBoard = () => {
    handleLogout();
    navigate("/login");
  };

  return (
    <div>
      <h1>Hola</h1>
      <button onClick={handleLogoutInDashBoard}>Cerrar sesión</button>
    </div>
  );
};

export default DashBoard;
