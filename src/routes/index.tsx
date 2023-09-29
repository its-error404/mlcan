import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import AuthWrapper from "../views/Auth/AuthWrapper";
import { AppRoutes } from "./routeConstants/appRoutes";
import RequireAuth from "../shared/components/HOC/requireAuth";
import RepairList from "../views/RepairList";
import ViewContainer from "../views/Containers/ViewContainer";
import AllContainers from "../views/Containers";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoutes.AUTH} element={<AuthWrapper />} />

        {/* Protected Routes */}

        <Route element={<RequireAuth/>}>
          <Route path={AppRoutes.CONTAINERS} element={<AllContainers/>}/>
          <Route path={AppRoutes.REPAIR_LIST} element={<RepairList />} />
          <Route path={AppRoutes.INDV_CONTAINER} element={<ViewContainer/>} />
        </Route>

        {/*End of Protected Routes */ }

      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
