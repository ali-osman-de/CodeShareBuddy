import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ children }) => {
    const { isAuthenticated, expirationTime, accessToken } = useSelector(
        (state) => state.auth
    );

    const isTokenExpired = expirationTime
        ? new Date().getTime() > new Date(expirationTime).getTime()
        : true;

    if (!isAuthenticated || !accessToken || isTokenExpired) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default PrivateRoute;
