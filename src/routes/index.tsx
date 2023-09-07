import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import AuthWrapper from "../views/Auth/AuthWrapper";
import AllContainers from "../views/AppComponents/Containers";
import RepairList from "../views/AppComponents/RepairList";
import { AppRoutes } from "./routeConstants/appRoutes";
import RequireAuth from "../shared/components/HOC/requireAuth";


const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoutes.AUTH} element={<AuthWrapper />} />
        {/* <Route path={AppRoutes.CONTAINERS} element={<PrivateRoute component={AllContainers} />} /> */}
        <Route element={<RequireAuth/>}>
          <Route path={AppRoutes.CONTAINERS} element={<AllContainers/>}/>
          <Route path={AppRoutes.REPAIR_LIST} element={<RepairList />} />
        </Route>
        {/* <PrivateRoute path={AppRoutes.CONTAINERS} element={<AllContainers/>} auth={isAuthenticated()}/> */}
        {/* <Route
          path={AppRoutes.CONTAINERS}
          element={
            <PrivateRoute
              element={<AllContainers />}
              auth={isAuthenticated()}
            />}/> */}
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
