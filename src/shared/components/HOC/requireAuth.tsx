import React, { FC, useEffect } from 'react';
import { withRouter } from "react-router-dom";
import * as appRoutes from "../../../routes/routeConstants/appRoutes";
import RestrictAccess from "../RestrictedAccess";
import AuthContainer from '../../../store/container/AuthContainer';

const requireAuth = (Component: any, allowedRoles: any = []) => {
    const Authentication = (props: any) => {
        useEffect(() => {
            const { authenticated, history } = props;
            if (!authenticated && history.location.pathname !== appRoutes.LOGIN) {
                return history.push(appRoutes.LOGIN);
            }
        }, [props]);

        if(allowedRoles.length) {
            const { user } = props;
            return allowedRoles.includes(user.role) ? <Component {...props} /> : <RestrictAccess />;
        }
        return <Component {...props} />
    } 
    return withRouter(AuthContainer(Authentication));
};

export const isAuthenticated = (component: FC) => {
    return requireAuth(component);
};


export default isAuthenticated;