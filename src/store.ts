import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import RootReducer from "./store/reducers";

export const store = createStore(RootReducer, applyMiddleware(logger))