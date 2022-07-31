import React, { useState } from "react";
import { useEffect } from "react";

import { CgMouse } from "react-icons/cg";
import { useDispatch, useSelector } from "react-redux";

import MetaData from "../Layout/MetaData";
import "./Home.css";
import Product from "./Product";
import { clearErrors, getProduct } from "../../store/actions/productAction";
import Loader from "../Layout/Loader/Loader";
import AlertBar from "../Layout/Alert/Alert";

const Home = () => {
	const dispatch = useDispatch();
	const [errors, setErrors] = useState();
	const { loading, error, products } = useSelector((state) => state.products);

	useEffect(() => {
		setErrors(error);
		dispatch(getProduct);
	}, [dispatch]);

	return (
		<>
			{errors && <AlertBar type="error" title="Error" description={errors} />},
			{loading ? (
				<Loader />
			) : (
				<>
					<MetaData title="Ecommerce - Buy with us" />
					<div className="banner">
						<p>Welcome to Ecommerce</p>
						<h1>FIND AMAZING PRODUCTS BELOW</h1>

						<a href="#container">
							<button>
								Scroll <CgMouse />
							</button>
						</a>
					</div>

					<h2 className="homeHeading">Featured Products</h2>

					<div className="container" id="container">
						{products &&
							products.map((product) => (
								<Product key={product._id} product={product} />
							))}
					</div>
				</>
			)}
		</>
	);
};

export default Home;
