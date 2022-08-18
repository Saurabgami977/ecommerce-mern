import React from "react";
import { Link } from "react-router-dom";
import PageNotFound from "../../../images/404.jpg";

const NotFound = () => {
	const styles = {
		body: {
			backgroundColor: "#F2F2F2",
			width: "100vw",
			height: "100vh",
			maxWidth: "100%",
			display: "flex",
			justifyContent: "center",
			alignItems: "center",
			flexDirection: "column",
		},
		image: {
			width: "60vw",
			height: "80vh",
			maxWidth: "100%",
		},
		p: {},
		link: {
			textDecoration: "none",
			color: "black",
			backgroundColor: "tomato",
			padding: "1vmax",
			borderRadius: "4px",
			font: "500 1.6vmax Roboto",
			cursor: "pointer",
		},
	};

	return (
		<div style={styles.body}>
			<img style={styles.image} src={PageNotFound} alt="Page Not Found" />
			<p style={styles.p}>
				<Link style={styles.link} to="/">
					Go to Home{" "}
				</Link>
			</p>
		</div>
	);
};

export default NotFound;
