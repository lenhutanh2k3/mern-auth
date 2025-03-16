import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

function PrivateRoute() {
  const { userCurrent } = useSelector((state) => state.user);
  return userCurrent ? <Outlet /> : <Navigate to="/login" />;
}
export default PrivateRoute;
