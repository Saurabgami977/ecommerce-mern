import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";

import Loader from "../Layout/Loader/Loader";
import ProductCard from "../Home/ProductCard";
import { clearErrors, getProduct } from "../../store/actions/productAction";
import "./Products.css";

const Products = () => {
	const dispatch = useDispatch();
	const alert = useAlert();
	const { products, loading, error, productsCount } = useSelector(
		(state) => state.products,
	);

	useEffect(() => {
		if (error) {
			alert.error(error);
			return dispatch(clearErrors);
		}
		dispatch(getProduct);
	}, [dispatch, error, alert]);

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
