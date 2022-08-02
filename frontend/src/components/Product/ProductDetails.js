import React, { useEffect, useState } from "react";

import Carousel from "react-material-ui-carousel";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import { useAlert } from "react-alert";

import Loader from "../Layout/Loader/Loader";
import MetaData from "../Layout/MetaData";
import ReviewCard from "./ReviewCard.js";
import { getProductDetails } from "../../store/actions/productAction";
import "./ProductDetails.css";

const ProductDetails = ({ match }) => {
	const alert = useAlert();
	const { id } = useParams();
	const dispatch = useDispatch();
	const [numOfItems, setNumOfItems] = useState(1);
	const { product, loading, error } = useSelector(
		(state) => state.productDeatails,
	);

	useEffect(() => {
		if (error) {
			return alert.error(error);
		}
		dispatch(getProductDetails(id));
	}, [error]);

	const options = {
		edit: false,
		color: "rgba(20,20,20,0.1",
		activeColot: "tomato",
		size: window.innerWidth < 600 ? 20 : 25,
		value: Number(product.rating),
		isHalf: true,
	};

	return (
		<>
			<MetaData title={product.name} />
			{loading ? (
				<Loader />
			) : (
				<>
					<div className="ProductDetails">
						<div className="leftBar">
							<Carousel className="carousel">
								{product.images &&
									product.images.map((image, index) => (
										<img
											key={index}
											className="CarouselImage"
											src={image.url}
											alt="product"
										/>
									))}
							</Carousel>
						</div>
						<div className="rightBar">
							<div className="detailsBlock-1">
								<h2>{product.name}</h2>
								<p>Product # {product._id}</p>
							</div>
							<div className="detailsBlock-2">
								<ReactStars {...options} />
								<span>({product.numOfReviews} Reviews)</span>
							</div>
							<div className="detailsBlock-3">
								<h1>
									$<strong>{product.price}</strong>
								</h1>
								<div className="detailsBlock-3-1">
									<div className="detailsBlock-3-1-1">
										<button onClick={() => setNumOfItems(numOfItems - 1)}>
											-
										</button>
										<input
											type="number"
											value={numOfItems}
											onChange={(e) => setNumOfItems(e.target.value)}
										/>
										<button onClick={() => setNumOfItems(numOfItems + 1)}>
											+
										</button>
									</div>
									<button variant="outlined" color="primary">
										Add to Cart
									</button>
								</div>
								<p>
									Status:{" "}
									<b className={product.stock < 1 ? "redColor" : "greenColor"}>
										{product.stock < 1 ? "Out of Stock" : "In Stock"}
									</b>
								</p>
							</div>
							<div className="detailsBlock-4">
								Description: <p>{product.description}</p>
							</div>

							<button className="submitReview"> Submit Review </button>
						</div>
					</div>
				</>
			)}
			<h3 className="reviewsHeading">Reviews</h3>
			{product.reviews && product.reviews[0] ? (
				<div className="reviews">
					{product.reviews &&
						product.reviews.map((review, index) => (
							<ReviewCard key={index} review={review} />
						))}
				</div>
			) : (
				<p className="noReviews">No Review Yet</p>
			)}
		</>
	);
};

export default ProductDetails;
