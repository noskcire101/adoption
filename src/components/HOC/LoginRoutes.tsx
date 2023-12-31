import { useEffect, useState } from "react";
import { useAppSelector } from "../../storeReduxTools/storeHooks";
import { Navigate, Outlet } from "react-router-dom";

const LoginRoutes = () => {
  const { user } = useAppSelector((state) => state.auth);
  return Boolean(user) ? <Outlet /> : <Navigate to="/login" />;
};

export default LoginRoutes;
