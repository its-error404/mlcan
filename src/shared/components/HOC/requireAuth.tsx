import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { isAuthenticated } from "../../../services/AuthService/auth.service";
import { ApiRoutes } from "../../../routes/routeConstants/apiRoutes";

const RequireAuth = () => {

  const auth = isAuthenticated()
  return auth ? <Outlet /> : <Navigate to={ApiRoutes.USER_LOGIN} />;
}

export default RequireAuth