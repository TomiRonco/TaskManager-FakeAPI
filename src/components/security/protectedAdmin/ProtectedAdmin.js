import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthenticationContext } from "../../../services/authenticationContext/authentication.context";

const ProtectedAdmin = ({ children }) => {
  const { user } = useContext(AuthenticationContext);

  if (!user) {
    return <Navigate to="/login" replace />;
  } else if (user.userType !== "superAdmin" && user.userType !== "Admin") {
    return <Navigate to="/pageNotAuthorized" replace />;
  }

  return children;
};

export default ProtectedAdmin;
