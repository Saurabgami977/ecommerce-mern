import React from "react";

import { Outlet } from "react-router-dom";

// components
import Header from "./Header/Header";
import Footer from "./Footer/Footer";

const UserLayout = () => {
	return (
		<>
			<Header />
			<Outlet />
			<Footer />
		</>
	);
};

export default UserLayout;
