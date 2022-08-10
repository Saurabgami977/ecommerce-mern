import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import Pagination from "react-js-pagination";
import { useParams } from "react-router-dom";
import { Slider, Typography } from "@mui/material";

import Loader from "../Layout/Loader/Loader";
import ProductCard from "../Home/ProductCard";
import { clearErrors, getProduct } from "../../store/actions/productAction";
import "./Products.css";

const categories = [
	"Laptop",
	"Footwear",
	"Bottom",
	"Tops",
	"Attire",
	"Accessories",
	"Others",
	"Camera",
	"Smartphones",
];

const Products = () => {
	const dispatch = useDispatch();
	const alert = useAlert();
	const params = useParams();
	const [currentPage, setCurrentPage] = useState(1);
	const [price, setPrice] = useState([0, 25000]);
	const [category, setCategory] = useState("");
	const [ratings, setRatings] = useState(0);

	const {
		products,
		loading,
		error,
		productsCount,
		resultPerPage,
		filteredProductsCount,
	} = useSelector((state) => state.products);

	const keyword = params.keyword;
	const count = filteredProductsCount;

	const setCurrentPageNo = (e) => {
		setCurrentPage(e);
	};

	const priceHandler = (e, newPrice) => {
		setPrice(newPrice);
	};

	useEffect(() => {
		if (error) {
			alert.error(error);
			return dispatch(clearErrors);
		}
		dispatch(getProduct(keyword, currentPage, price, category, ratings));
	}, [dispatch, error, alert, keyword, currentPage, price, category, ratings]);

	return (
		<>
			{loading ? (
				<Loader />
			) : (
				<>
					<h2 className="productsHeading">Products</h2>
					<div className="products">
						{products &&
							products.map((product) => (
								<ProductCard key={product._id} product={product} />
							))}
					</div>
					<div className="filterBox">
						<Typography>Price</Typography>
						<Slider
							value={price}
							valueLabelDisplay="auto"
							onChange={priceHandler}
							aria-labelledby="range-slider"
							min={0}
							max={25000}
						/>

						<Typography>Category</Typography>
						<ul className="categoryBox">
							{categories.map((category) => (
								<li
									key={category}
									className="category-link"
									onClick={() => setCategory(category.toLowerCase())}
								>
									{category}
								</li>
							))}
						</ul>

						<fieldset>
							<Typography component="legend">Ratings Above</Typography>
							<Slider
								value={ratings}
								onChange={(e, newRating) => setRatings(newRating)}
								aria-labelledby="continuous-slider"
								min={0}
								max={5}
								valueLabelDisplay="auto"
								size="small"
							/>
						</fieldset>
					</div>

					{resultPerPage < count && (
						<div className="paginationBox">
							<Pagination
								activePage={currentPage}
								itemsCountPerPage={resultPerPage}
								totalItemsCount={productsCount}
								onChange={setCurrentPageNo}
								nextPageText="Next"
								prevPageText="Prev"
								lastPageText="Last"
								itemClass="page-item"
								linkClass="page-link"
								activeClass="pageItemActive"
								activeLinkClass="pageLinkActive"
							/>
						</div>
					)}
				</>
			)}
		</>
	);
};

export default Products;
