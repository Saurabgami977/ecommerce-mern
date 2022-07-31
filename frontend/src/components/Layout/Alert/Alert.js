import * as React from "react";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Stack from "@mui/material/Stack";

const AlertBar = ({ type, title, description }) => {
	return (
		<Stack sx={{ width: "100%" }} spacing={2}>
			<Alert
				severity={type}
				sx={{ position: "absolute", bottom: 50, left: 50, zIndex: 1000 }}
			>
				<AlertTitle>{title}</AlertTitle>
				{description} <strong>check it out!</strong>
			</Alert>
		</Stack>
	);
};

export default AlertBar;
