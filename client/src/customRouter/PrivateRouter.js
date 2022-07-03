import { Navigate, Outlet, useLocation } from "react-router-dom";

const PrivateRouter = () => {
  const location = useLocation();
  const auth = localStorage.getItem("firstLogin");

  return auth ? <Outlet /> : <Navigate to="/" state={{ from: location }} replace />;
};

export default PrivateRouter;
