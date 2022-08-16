import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
	const { loading, isAuthenticated } = useSelector(
		(state) => state.userReducer,
	);

	return (
		<>{!loading && !isAuthenticated ? <Navigate to="/login" /> : children}</>
	);
};

export default ProtectedRoute;
