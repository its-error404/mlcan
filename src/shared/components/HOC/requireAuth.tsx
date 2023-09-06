import React from "react";
import { Navigate, RouteProps, Route } from "react-router-dom";
import { isAuthenticated } from "../../../services/AuthService/auth.service";

interface PrivateRouteProps extends RouteProps {

  auth: string
  element: React.ReactNode
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element, ...rest }) => {
  return (
    <Route
      {...rest}
      element={
        rest.auth ? (
          element
        ) : (
          <Navigate to="/auth/login" replace />
        )
      }
    />
  );
};

export default PrivateRoute;
