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

const Products = () => {
	const dispatch = useDispatch();
	const alert = useAlert();
	const params = useParams();
	const [currentPage, setCurrentPage] = useState(1);
	const [price, setPrice] = useState([0, 25000]);

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
		dispatch(getProduct(keyword, currentPage, price));
	}, [dispatch, error, alert, keyword, currentPage, price]);

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
