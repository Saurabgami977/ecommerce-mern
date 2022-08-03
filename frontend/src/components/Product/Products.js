import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";

import Loader from "../Layout/Loader/Loader";
import ProductCard from "../Home/ProductCard";
import { clearErrors, getProduct } from "../../store/actions/productAction";
import "./Products.css";
import { useParams } from "react-router-dom";

const Products = () => {
	const dispatch = useDispatch();
	const alert = useAlert();
	const params = useParams();
	const { products, loading, error } = useSelector((state) => state.products);

	const keyword = params.keyword;

	useEffect(() => {
		if (error) {
			alert.error(error);
			return dispatch(clearErrors);
		}
		dispatch(getProduct(keyword));
	}, [dispatch, error, alert, keyword]);

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
				</>
			)}
		</>
	);
};

export default Products;
