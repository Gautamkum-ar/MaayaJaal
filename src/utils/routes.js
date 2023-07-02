import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/authContext";

export const ProtectedRoutes = () => {
  const { authenticated, loading } = useAuth();
  const location = useLocation();

  return authenticated && !loading ? (
    <Outlet />
  ) : (
    <Navigate state={{ from: location }} replace to="/" />
  );
};

export const PublicRoutes = () => {
  const { authenticated, loading } = useAuth();
  const location = useLocation();

  return !authenticated && !loading ? (
    <Outlet />
  ) : (
    <Navigate state={{ from: location }} replace to="/home" />
  );
};
