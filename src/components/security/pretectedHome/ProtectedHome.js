import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthenticationContext } from "../../../services/authenticationContext/authentication.context";

const ProtectedHome = ({ children }) => {
  const { user } = useContext(AuthenticationContext);

  if (!user) {
    return <Navigate to="/*" replace />;
  }

  return children;
};

export default ProtectedHome;
