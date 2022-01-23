import React, { FC, useEffect } from 'react';
import { withRouter } from "react-router-dom";
import { AuthContext } from '../../../context/AuthContext';
import * as appRoutes from "../../../routes/routeConstants/appRoutes";
import RestrictAccess from "../RestrictedAccess";

const requireAuth = (Component: any, allowedRoles: any = []) => {
    const Authentication = (props: any) => {
        const { authenticated } = AuthContext();
        console.log(authenticated);
        
        useEffect(() => {
            console.log(authenticated);
            const { history } = props;
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
    return withRouter(Authentication);
};

export const isAuthenticated = (component: FC) => {
    return requireAuth(component);
};


export default isAuthenticated;