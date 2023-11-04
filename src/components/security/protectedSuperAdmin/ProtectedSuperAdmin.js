import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthenticationContext } from "../../../services/authenticationContext/authentication.context";

const ProtectedSuperAdmin = ({ children }) => {
  const { user } = useContext(AuthenticationContext);

  if (!user) {
    return <Navigate to="/login" replace />;
  } else if (user.userType !== "superAdmin") {
    return <Navigate to="/pageNotAuthorized" replace />;
  }

  return children;
};

export default ProtectedSuperAdmin;
