import { useContext } from "react";
import { AuthenticationContext } from "../../service/authenticationContext/authentication.context";
import { useNavigate } from "react-router";

const DashBoard = () => {
  const { handleLogout } = useContext(AuthenticationContext);

  const navigate = useNavigate();

  const handleLogoutInDashBoard = () => {
    handleLogout();
    navigate("/login");
  };

  return (
    <div className="row">
      <div className="col-9 bg-success">hola</div>
    </div>
  );
};

export default DashBoard;
