import React from "react";

import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import GroupIcon from "@mui/icons-material/Group";
import InventoryIcon from "@mui/icons-material/Inventory";
import AutorenewIcon from "@mui/icons-material/Autorenew";

import MetaData from "../Layout/MetaData";
import "./css/Dashboard.css";
import StatusCard from "./StatusCard";

const Dashboard = () => {
	const statusData = [
		{
			title: "Total Sales",
			value: "$ 3.5k",
			Icon: MonetizationOnIcon,
			iconColor: "red",
			to: "/admin/orders",
		},
		{
			title: "Total Customers",
			value: "2.3k",
			Icon: GroupIcon,
			iconColor: "#14B8A6",
			to: "/admin/users",
		},
		{
			title: "Total Products",
			value: 342,
			Icon: InventoryIcon,
			iconColor: "#FFB020",
			to: "/admin/products",
		},
		{
			title: "New Orders",
			value: 334,
			Icon: AutorenewIcon,
			iconColor: "#5048E5",
			to: "/admin/orders",
		},
	];

	return (
		<>
			<MetaData title="Admin Dashboard - Saurav Store" />
			<div className="dashboardBody">
				<div className="statusBar">
					{statusData.map((status, index) => (
						<StatusCard
							key={index}
							title={status.title}
							Icon={status.Icon}
							value={status.value}
							iconColor={status.iconColor}
							to={status.to}
						/>
					))}
				</div>
			</div>
		</>
	);
};

export default Dashboard;
