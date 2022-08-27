import React from "react";
import { useEffect } from "react";

import { CgMouse } from "react-icons/cg";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import Fade from "react-reveal/Fade";

import MetaData from "../Layout/MetaData";
import "./Home.css";
import ProductCard from "./ProductCard";
import { clearErrors, getProduct } from "../../store/actions/productAction";
import Loader from "../Layout/Loader/Loader";

const Home = () => {
	const alert = useAlert();
	const dispatch = useDispatch();
	const { loading, error, products } = useSelector((state) => state.products);

	useEffect(() => {
		if (error) {
			alert.error(error);
			return dispatch(clearErrors);
		}
		dispatch(getProduct());
	}, [alert, dispatch, error]);

	return (
		<>
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
								<Fade top>
									<ProductCard key={product._id} product={product} />
								</Fade>
							))}
					</div>
				</>
			)}
		</>
	);
};

export default Home;
