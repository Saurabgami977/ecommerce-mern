import React, { useState } from "react";

import Modal from "@mui/material/Modal";
import { useDispatch, useSelector } from "react-redux";
import { createBrowserHistory } from "history";

import "./search.css";
import "./search.css";

const Search = () => {
	const dispatch = useDispatch();
	const history = createBrowserHistory();
	const [keyword, setKeyword] = useState("");
	const searchModalStatus = useSelector(
		(state) => state.searchModalStatus.modalStatus,
	);

	const handleClose = () => {
		dispatch({ type: "CHANGE_SEARCH_MODAL_STATUS", payload: false });
	};

	const searchSubmitHandler = (e) => {
		e.preventDefault();
		if (keyword.trim()) {
			history.push(`/products/${keyword}`);
		} else {
			history.push(`/products`);
		}
		dispatch({ type: "CHANGE_SEARCH_MODAL_STATUS", payload: false });
	};

	return (
		<div>
			<Modal
				open={searchModalStatus}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				{/* <Box sx={style}> */}
				<form onSubmit={searchSubmitHandler} className="searchBox">
					<input
						autoFocus
						type="text"
						name="search"
						placeholder="Search..."
						value={keyword}
						onChange={(e) => setKeyword(e.target.value)}
					/>
					<input type="submit" value="Search" />
				</form>
				{/* </Box> */}
			</Modal>
		</div>
	);
};

export default Search;

// import React, { useState } from "react";

// import './search.css'

// const Search = ({ history }) => {
// 	const [keyword, setKeyword] = useState("");

// 	const searchSubmitHandler = (e) => {
// 		e.preventDefault();
// 		if (keyword.trim()) {
// 			history.push(`/products/${keyword}`);
// 		} else {
// 			history.push(`/products`);
// 		}
// 	};
// 	return (
// <>
// 	<form onSubmit={searchSubmitHandler} className="searchBox">
// 		<input
// 			type="text"
// 			name="search"
// 			placeholder="Search"
// 			value={keyword}
// 			onChange={(e) => setKeyword(e.target.value)}
// 		/>
// 		<input type="submit" value="search" />
// 	</form>
// </>
// 	);
// };

// export default Search;
