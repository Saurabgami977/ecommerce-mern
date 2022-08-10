import React from "react";

import Search from "./Search";

const NotFound = () => {
	return (
		<div>
			Search Results Not Found. Please Search Again or Remove Filters.{" "}
			<Search />{" "}
		</div>
	);
};

export default NotFound;
