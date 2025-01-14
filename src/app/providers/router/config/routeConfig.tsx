import React from "react";
import {AppRoutesProps} from "./routerPaths";
import {AppRoutes, getRouteDashboard} from "../../../../shared/configs/router";
import {Coffee} from "../../../../pages/Coffee";

export const routeConfig: React.FC | Record<AppRoutes, AppRoutesProps> = {
    [AppRoutes.DASHBOARD]: {
        path: getRouteDashboard(),
        element: <Coffee />,
    },
};
