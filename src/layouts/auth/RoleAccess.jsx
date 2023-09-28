import { Navigate, Outlet } from "react-router-dom";
import cookie from "react-cookies"

const RoleAccess = ({ roles = [] }) => {
  const user = cookie.load("current-user");
  console.log(user)
  if(user === undefined) return  (<Navigate to="/error/401" replace />)
  return !roles.length || roles.includes(user?.role) ? (
    <Outlet />
  ) : (
    <Navigate to="/error/403" replace />
  );
};

export default RoleAccess;