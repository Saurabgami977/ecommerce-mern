import React, { useEffect, useState } from "react";

import Carousel from "react-material-ui-carousel";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useAlert } from "react-alert";
import {
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Button,
	Rating,
} from "@mui/material";

import Loader from "../Layout/Loader/Loader";
import MetaData from "../Layout/MetaData";
import ReviewCard from "./ReviewCard.js";
import {
	clearErrors,
	getProductDetails,
	newReview,
} from "../../store/actions/productAction";
import "./css/ProductDetails.css";
import NotFound from "../Layout/NotFound/NotFound";
import { addItemsToCart } from "../../store/actions/cartActions";
import { NEW_REVIEW_RESET } from "../../store/constants/productConstants";
import AlertBar from "../Layout/Alert/Alert";

const ProductDetails = () => {
	const alert = useAlert();
	const { id } = useParams();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [quantity, setQuantity] = useState(1);
	const [openSubmit, setOpenSubmit] = useState(false);
	const [open, setOpen] = useState(false);

	const [ratings, setRatings] = useState(0);
	const [comment, setComment] = useState("");

	const { product, loading, error } = useSelector(
		(state) => state.productDeatails,
	);
	const { success, error: reviewError } = useSelector(
		(state) => state.newReviewReducer,
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

	const reviewSubmitHandler = () => {
		const data = {
			rating: ratings,
			comment,
			productId: id,
		};
		dispatch(newReview(data));
		setOpenSubmit(false);
		setRatings(0);
		setComment("");
	};

	useEffect(() => {
		if (error) {
			alert.info(error);
			dispatch(clearErrors());
		}
		if (reviewError) {
			alert.info(reviewError);
			dispatch(clearErrors());
		}
		if (success) {
			dispatch({ type: NEW_REVIEW_RESET });
			setOpen(!open);
			document.body.style.overflow = "hidden";
		}
		dispatch(getProductDetails(id));
	}, [error, reviewError, alert, dispatch, success, open, id]);

	if (open) {
		setTimeout(() => {
			setOpen(false);
		}, 4000);
	}

	const options = {
		size: "large",
		value: Number(product && product.ratings),
		readOnly: true,
		precision: 0.5,
	};

	return (
		<>
			{loading ? (
				<Loader />
			) : product ? (
				<>
					<AlertBar isOpen={open} message="Review Added" />
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
								<Rating {...options} />
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
										disabled={product.stock < 1 ? true : false}
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

							<button
								className="submitReview"
								onClick={() => setOpenSubmit(!openSubmit)}
							>
								{" "}
								Submit Review{" "}
							</button>
						</div>
					</div>
					<h3 className="reviewsHeading">Reviews</h3>
					<Dialog
						open={openSubmit}
						onClose={() => setOpenSubmit(!openSubmit)}
						aria-label="simple-dialog-title"
					>
						<DialogTitle>Submit Review</DialogTitle>
						<DialogContent className="submitDialog">
							<Rating
								onChange={(e) => setRatings(e.target.value)}
								value={Number(ratings)}
								size="large"
							/>

							<textarea
								className="submitDialogTextArea"
								cols="30"
								rows="5"
								value={comment}
								onChange={(e) => setComment(e.target.value)}
							></textarea>
							<DialogActions>
								<Button
									color="secondary"
									onClick={() => setOpenSubmit(!openSubmit)}
								>
									Cancel
								</Button>
								<Button onClick={reviewSubmitHandler}>Submit</Button>
							</DialogActions>
						</DialogContent>
					</Dialog>
					{product && product.reviews ? (
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
