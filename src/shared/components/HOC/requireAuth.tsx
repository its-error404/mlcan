import React from "react";
import { Navigate, RouteProps, Route } from "react-router-dom";
import { isAuthenticated } from "../../../services/AuthService/auth.service";

interface PrivateRouteProps extends RouteProps {
  component: React.ComponentType<RouteProps>;
}

const PrivateRoute = ({ component: Component, ...rest }: PrivateRouteProps) => {
  return (
    <Route
      {...rest}
      element={
        isAuthenticated() ? (
          <Component {...rest} />
        ) : (
          <Navigate to="/login" replace />
        )
      }
    />
  );
};

export default PrivateRoute;
