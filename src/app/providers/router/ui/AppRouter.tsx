import React, {memo, Suspense, useCallback} from "react";
import {Route, Routes} from "react-router-dom";
import {RequireAuth} from "./RequireAuth";
import {routeConfig} from "../config/routeConfig";
import {AppRoutesProps} from "../config/routerPaths";

const AppRouter: React.FC = () => {
    const renderWithWrapper = useCallback((route: AppRoutesProps) => {
        const element = <Suspense fallback={"...loading page"}>{route.element}</Suspense>;

        return (
            <Route
                key={route.path}
                path={route.path}
                element={route.authOnly ? <RequireAuth>{element}</RequireAuth> : element}
            />
        );
    }, []);

    return <Routes>{Object.values(routeConfig).map(renderWithWrapper)}</Routes>;
};

export default memo(AppRouter);
