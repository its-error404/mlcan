import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import RegisterForm from "../../views/Auth/RegisterForm";
import LoginForm from "../../views/Auth/LoginForm";
import { AppRoutes, NavigationRoutes } from "../../routes/routeConstants/appRoutes";

const authRouter = () => {
  const routes = [
    { path: AppRoutes.REGISTER, element: <RegisterForm /> },
    { path: AppRoutes.LOGIN, element: <LoginForm /> },
  ];

  return (
    <Routes>
      {routes.map(({ path, element }) => (
        <Route key={path} path={path} element={element} />
      ))}
      <Route path="*" element={<Navigate to={NavigationRoutes.LOGIN} />} />
    </Routes>
  );
};

export default authRouter;
