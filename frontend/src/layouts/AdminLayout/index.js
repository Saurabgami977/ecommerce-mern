import React from "react";

import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import Sidebar from "./SideBar";

import { styled } from "@mui/material/styles";

const BaseDesign = styled("div")({
	display: "flex",
	flexDirection: "column",
	minHeight: "100%",
	overflow: "hidden",
});

const AdminLayout = () => {
	const { user, loading } = useSelector((state) => state.userReducer);

	if (loading != "idle" && loading === false) {
		// Return to login if user is undefined
		if (user === undefined) {
			return null;
		}

		// Return to login if user is null
		if (user === null) {
			return <Navigate to="/login" />;
		}

		// If user = admin render admin dashboard
		if (user.role === "admin") {
			return (
				<BaseDesign>
					<Sidebar />
					<Outlet />
				</BaseDesign>
			);
		}

		// If userRole = user = navigate to homepage
		if (user.role === "user") {
			return <Navigate to="/" />;
		}
	}
};

export default AdminLayout;
