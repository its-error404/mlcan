import React from "react";
import { Outlet } from "react-router-dom";
import { isAuthenticated } from "../../../services/AuthService/auth.service";
import RestrictAccess from "../RestrictedAccess";

const RequireAuth = () => {

  const auth = isAuthenticated()
  return auth ? <Outlet /> : <RestrictAccess />;
}

export default RequireAuth