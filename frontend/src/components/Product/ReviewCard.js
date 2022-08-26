import { Rating } from "@mui/material";
import React from "react";

import profilePng from "../../images/ppRound.png";

const ReviewCard = ({ review }) => {
	const options = {
		value: review.rating,
		precision: 0.5,
		readOnly: true,
	};
	return (
		<div className="reviewCard">
			<img src={profilePng} alt="User" />
			<p>{review.name}</p>
			<Rating {...options} />
			<span>{review.comment}</span>
		</div>
	);
};

export default ReviewCard;
