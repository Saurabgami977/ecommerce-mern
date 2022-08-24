import React from "react";

import { Step, StepLabel, Stepper, Typography } from "@mui/material";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import LibraryAddCheckIcon from "@mui/icons-material/LibraryAddCheck";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";

const CheckoutSteps = ({ activeStep }) => {
	const steps = [
		{
			label: <Typography>Shipping Details</Typography>,
			icon: <LocalShippingIcon />,
		},
		{
			label: <Typography>Confirm Order</Typography>,
			icon: <LibraryAddCheckIcon />,
		},
		{
			label: <Typography>Payment</Typography>,
			icon: <AccountBalanceIcon />,
		},
	];

	const stepStyles = {
		boxSizing: "border-box",
	};
	return (
		<>
			<Stepper alternativeLabel activeStep={activeStep} style={stepStyles}>
				{steps.map((item, index) => (
					<Step key={index}>
						<StepLabel icon={item.icon}>{item.label}</StepLabel>
					</Step>
				))}
			</Stepper>
		</>
	);
};

export default CheckoutSteps;
