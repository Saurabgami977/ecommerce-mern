import React from "react";

import { Card, Typography } from "@mui/material";

const StatusCard = ({ title, Icon, value, iconColor }) => {
	const styles = {
		topSection: {
			display: "flex",
			flexDirection: "row",
			alignItems: "center",
			justifyContent: "space-between",
		},
		statusBar: {
			width: 250,
			height: 150,
			margin: 20,
			padding: 10,
		},
		cardHeader: {
			font: "200 1.1vmax Roboto",
			opacity: 0.6,
		},
		value: {
			marginTop: 20,
			font: "900 3vmax Roboto",
		},
		icon: {
			fontSize: 50,
			color: iconColor,
		},
	};
	console.log(iconColor);
	return (
		<>
			<Card elevation={3} style={styles.statusBar}>
				<div style={styles.topSection}>
					<Typography style={styles.cardHeader}>{title}</Typography>
					<Icon style={styles.icon} />
				</div>
				<Typography style={styles.value}>{value}</Typography>
			</Card>
		</>
	);
};

export default StatusCard;
