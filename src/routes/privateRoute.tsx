// src/components/PrivateRoute.tsx
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useUser } from "../contexts/userContext";

const PrivateRoute = () => {
  const { status } = useUser();
  const location = useLocation();

  if (status === "loading") {
    return <div style={{ padding: 24 }}>در حال بررسی ورود...</div>;
  }
  if (status === "authenticated") {
    return <Outlet />;
  }
  // اگر لاگین نیست → بره لاگین، و مسیر قبلی رو نگه داریم
  return <Navigate to="/user" replace state={{ from: location }} />;
};

export default PrivateRoute;
