import { Navigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../contexts/AuthContext";

export function RequireAuth({ children }: { children: JSX.Element }) {
    let auth = useAuth();
    let location = useLocation();
  
    if (!auth.user) {
      toast.error('Você precisa estar logado para acessar essa página!')
      return <Navigate to="/" state={{ from: location }} replace />;
    }
  
    return children;
}