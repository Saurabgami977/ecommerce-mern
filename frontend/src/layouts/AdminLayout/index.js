import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import Sidebar from "./SideBar";

import { styled } from "@mui/material/styles";
import { clearErrors, loadUser } from "../../store/actions/userAction";
import { useAlert } from "react-alert";

const BaseDesign = styled("div")({
	display: "flex",
	flexDirection: "column",
	minHeight: "100%",
	overflow: "hidden",
});

const AdminLayout = () => {
	const dispatch = useDispatch();
	const alert = useAlert();
	const { user, error, loading } = useSelector((state) => state.userReducer);

	useEffect(() => {
		dispatch(loadUser());
		if (error) {
			alert.show(error);
			dispatch(clearErrors());
		}
	}, [dispatch, error, alert]);

	// Return to login if user is undefined
	if (user === undefined) {
		return null;
	}

	// Return to login if user is null
	if (user === null) {
		return <Navigate to="/login" />;
	}

	if (loading === false) {
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
