import React, { useEffect, useState } from "react";

import Carousel from "react-material-ui-carousel";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import { useAlert } from "react-alert";

import Loader from "../Layout/Loader/Loader";
import MetaData from "../Layout/MetaData";
import ReviewCard from "./ReviewCard.js";
import {
	clearErrors,
	getProductDetails,
} from "../../store/actions/productAction";
import "./css/ProductDetails.css";
import NotFound from "../Layout/NotFound/NotFound";
import { addItemsToCart } from "../../store/actions/cartActions";

const ProductDetails = ({ match }) => {
	const alert = useAlert();
	const { id } = useParams();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [quantity, setQuantity] = useState(1);
	const { product, loading, error } = useSelector(
		(state) => state.productDeatails,
	);

	const increaseQuantity = () => {
		if (product.stock <= quantity) return;
		const qty = quantity + 1;
		setQuantity(qty);
	};

	const decreaseQuantity = () => {
		if (quantity <= 1) return;
		const qty = quantity - 1;
		setQuantity(qty);
	};

	const addToCartHandler = () => {
		dispatch(addItemsToCart(id, quantity));
		alert.success("Product added to cart");
		navigate("/cart");
	};

	useEffect(() => {
		if (error) {
			alert.info(error);
			dispatch(clearErrors());
		}
	}, [error, alert, dispatch]);

	useEffect(() => {
		dispatch(getProductDetails(id));
	}, [dispatch, id]);

	const options = {
		edit: false,
		color: "rgba(20,20,20,0.1",
		activeColot: "tomato",
		size: window.innerWidth < 600 ? 20 : 25,
		value: Number(product && product.ratings),
		isHalf: true,
	};

	return (
		<>
			{loading ? (
				<Loader />
			) : product ? (
				<>
					{product && <MetaData title={product.name + `- Saurav Store`} />}
					<div className="ProductDetails">
						<div className="leftBar">
							<Carousel className="carousel">
								{product &&
									product.images &&
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
								<h2>{product && product.name}</h2>
								<p>Product # {product && product._id}</p>
							</div>
							<div className="detailsBlock-2">
								<ReactStars {...options} />
								<span>({product && product.numOfReviews} Reviews)</span>
							</div>
							<div className="detailsBlock-3">
								<h1>
									$<strong>{product && product.price}</strong>
								</h1>
								<div className="detailsBlock-3-1">
									<div className="detailsBlock-3-1-1">
										<button onClick={decreaseQuantity}>-</button>
										<input readOnly type="number" value={quantity} />
										<button onClick={increaseQuantity}>+</button>
									</div>
									<button
										onClick={addToCartHandler}
										variant="outlined"
										color="primary"
									>
										Add to Cart
									</button>
								</div>
								<p>
									Status:{" "}
									<b
										className={
											product && product.stock < 1 ? "redColor" : "greenColor"
										}
									>
										{product && product.stock < 1 ? "Out of Stock" : "In Stock"}
									</b>
								</p>
							</div>
							<div className="detailsBlock-4">
								Description: <p>{product && product.description}</p>
							</div>

							<button className="submitReview"> Submit Review </button>
						</div>
					</div>
					<h3 className="reviewsHeading">Reviews</h3>
					{product && product.reviews && product.reviews[0] ? (
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
			) : (
				<NotFound />
			)}
		</>
	);
};

export default ProductDetails;
