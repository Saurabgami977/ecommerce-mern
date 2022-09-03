import React from "react";

import { Outlet } from "react-router-dom";
import { styled } from "@mui/material/styles";

// components
import Header from "./Header/Header";
import Footer from "./Footer/Footer";

const BaseDesign = styled("div")({
	display: "flex",
	flexDirection: "column",
	minHeight: "100%",
	overflow: "hidden",
	boxSizing: "border-box",
});

const UserLayout = () => {
	return (
		<BaseDesign>
			<Header />
			<Outlet />
			<Footer />
		</BaseDesign>
	);
};

export default UserLayout;
