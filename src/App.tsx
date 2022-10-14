import React from "react";
import AppRoutes from "./routes";
import { AuthProvider } from "./context/AuthContext";
import "antd/dist/antd.css";
import "./styles/_main.scss";
import RequireNetwork from "./shared/components/HOC/requireNetwork";

const App = () => {
  return (
    <RequireNetwork>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </RequireNetwork>
  );
};

export default App;
