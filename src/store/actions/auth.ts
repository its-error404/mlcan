import { User } from "../../models/user.model";
import {  AUTHENTICATED, UNAUTHENTICATED } from "../definitions/authConstants";
import { ActionProps } from "../../shared/types/action.type";

export const setAuthenticated = (user: User): ActionProps => ({
    type: AUTHENTICATED,
    payload: {
        authenticated: true,
        user
    }
})

export const setUnAuthenticated = (): ActionProps => {
    return {
        type: UNAUTHENTICATED,
        payload: {
            authenticated: false,
            user: null
        }
    }
}