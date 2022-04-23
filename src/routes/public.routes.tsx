import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export function PublicRoute({ children }: { children: JSX.Element }) {
    let auth = useAuth();
    let location = useLocation();
  
    if (auth.user) {
      return <Navigate to="/home" state={{ from: location }} replace />;
    }
  
    return children;
}