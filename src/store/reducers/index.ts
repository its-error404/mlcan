import { combineReducers } from "redux";
import authReducer, { AuthState } from "./authReducer";

export interface RootReducerProps {
    auth: AuthState
}

const RootReducer = combineReducers<RootReducerProps>({
    auth: authReducer
});

export default RootReducer;