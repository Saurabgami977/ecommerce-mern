import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import Pagination from "react-js-pagination";

import Loader from "../Layout/Loader/Loader";
import ProductCard from "../Home/ProductCard";
import { clearErrors, getProduct } from "../../store/actions/productAction";
import "./Products.css";
import { useParams } from "react-router-dom";

const Products = () => {
	const dispatch = useDispatch();
	const alert = useAlert();
	const params = useParams();
	const [currentPage, setCurrentPage] = useState(1);
	const { products, loading, error, productsCount, resultPerPage } =
		useSelector((state) => state.products);

	const keyword = params.keyword;

	const setCurrentPageNo = (e) => {
		setCurrentPage(e);
	};

	useEffect(() => {
		if (error) {
			alert.error(error);
			return dispatch(clearErrors);
		}
		dispatch(getProduct(keyword, currentPage));
	}, [dispatch, error, alert, keyword, currentPage]);

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
					{resultPerPage < productsCount && (
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
