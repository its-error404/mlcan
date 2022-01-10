import React from 'react';
import AppRoutes from './routes';
import { Provider } from "react-redux";
import { store } from "./store";
import 'antd/dist/antd.css';
import "./styles/_main.scss";

const App = () => {
  return (
    <Provider store={store}>
      <div className="App">
        <AppRoutes />
      </div>
    </Provider>
  );
}

export default App;
