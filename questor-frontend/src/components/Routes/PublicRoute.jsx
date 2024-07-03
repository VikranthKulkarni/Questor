import React from "react";
import { Navigate } from "react-router-dom";

const PublicRoute = ({ element: Component, ...rest }) => {
  const userId = sessionStorage.getItem("userId");

  return !userId ? <Component {...rest} /> : <Navigate to="/userDashboard" />;
};

export default PublicRoute;
