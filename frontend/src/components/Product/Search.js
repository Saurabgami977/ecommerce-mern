import React, { useState } from "react";

import "./search.css";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import MetaData from "../Layout/MetaData";

const Search = (notFound = false) => {
	const navigate = useNavigate();
	const [keyword, setKeyword] = useState("");

	const searchSubmitHandler = (e) => {
		e.preventDefault();
		if (keyword.trim()) {
			navigate(`/products/${keyword}`);
		} else {
			navigate(`/products`);
		}
	};

	return (
		<>
			<MetaData title="Search Products - Saurav Store" />
			<Box className="Outerbox">
				<h2>Search products</h2>
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
			</Box>
		</>
	);
};

export default Search;
