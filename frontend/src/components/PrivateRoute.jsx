import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

export default function PrivateRoute() {
  const isAdmin = useSelector((state) => state.admin.adminDetails);
  return isAdmin ? <Outlet /> : <Navigate to="/" />;
}
