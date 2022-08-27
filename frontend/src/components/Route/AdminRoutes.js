import React from "react";

import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = () => {
	const { user } = useSelector((state) => state.userReducer);

	if (user === undefined) {
		return null;
	}

	if (user === null) {
		return <Navigate to="/login" />;
	}

	if (user.role === "admin") {
		return <Outlet />;
	}

	if (user.role === "user") {
		return <Navigate to="/" />;
	}
};

export default ProtectedRoutes;
