import { AUTHENTICATED, UNAUTHENTICATED } from "../definitions/authConstants";
import { CreateReducer } from "../../shared/utils/createReducer";
import { User } from "../../models/user.model";
import { ActionProps } from "../../shared/types/action.type";

export interface AuthState {
    authenticated: boolean;
    user?: User;
}

export interface AuthReducerProps extends AuthState {
    setAuthenticated: (user: User) => ActionProps;
    setUnAuthenticated: () => ActionProps;
}

const initState: AuthState = {
    authenticated: false,
    user: undefined
};

const authReducer = CreateReducer(initState, {
    [AUTHENTICATED](state: AuthState, action: ActionProps): AuthState {
        const { authenticated, user } = action?.payload;
        return {
            ...state,
            authenticated,
            user
        };
    },
    [UNAUTHENTICATED](state: AuthState, action: ActionProps): AuthState {
        const { authenticated } = action?.payload;
        return { ...state, authenticated };
    }
});

export default authReducer;



