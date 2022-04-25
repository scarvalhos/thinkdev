import { Navigate, useLocation } from "react-router-dom";

import { useAuth } from "../contexts/AuthContext";

export function PublicRoute({ children }: { children: JSX.Element }) {
    const { user } = useAuth();
    const location = useLocation();
  
    if (user) {
      return <Navigate to="/home" state={{ from: location }} replace />;
    }
  
    return children;
}