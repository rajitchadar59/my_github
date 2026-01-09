import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const ProtectedRoute = ({ children }) => {
  const { CurrentUser, loading } = useAuth();

  if (loading) return null; 

  return CurrentUser ? children : <Navigate to="/auth" replace />;
};

export default ProtectedRoute;
