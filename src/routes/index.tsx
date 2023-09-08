import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import AuthWrapper from "../views/Auth/AuthWrapper";
import { AppRoutes } from "./routeConstants/appRoutes";
import RequireAuth from "../shared/components/HOC/requireAuth";
import AllContainers from "../views/Containers";
import RepairList from "../views/RepairList";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoutes.AUTH} element={<AuthWrapper />} />
        <Route path={AppRoutes.CONTAINERS} element={<AllContainers/>}/>
        <Route path={AppRoutes.REPAIR_LIST} element={<RepairList />} />

        {/* Protected Routes */}

        <Route element={<RequireAuth/>}>
          <Route path={AppRoutes.CONTAINERS} element={<AllContainers/>}/>
          <Route path={AppRoutes.REPAIR_LIST} element={<RepairList />} />
        </Route>

        {/*End of Protected Routes */ }

      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
