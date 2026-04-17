import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { contextData } from "./ContextData/ContextData";

const ProtectedRoute = ({ children }) => {
  const { user } = useContext(contextData);
  const token = localStorage.getItem("token");

  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
