import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoutes({ isLoggedIn}) {
  if (!isLoggedIn) {
    //  If not logged in, send user to /login
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
