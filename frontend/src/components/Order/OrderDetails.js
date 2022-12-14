import React, { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { Typography } from "@mui/material";
import { useAlert } from "react-alert";

import { getOrderDetails, clearErrors } from "../../store/actions/orderAction";
import Loader from "../Layout/Loader/Loader";
import MetaData from "../Layout/MetaData";
import NotFound from "../Layout/NotFound/NotFound";

import "./css/OrderDetails.css";

const OrderDetails = () => {
	const dispatch = useDispatch();
	const alert = useAlert();
	const { id } = useParams();

	const { order, error, loading } = useSelector(
		(state) => state.orderDetailsReducer,
	);

	useEffect(() => {
		if (error) {
			alert.show(error);
			dispatch(clearErrors());
		}
	}, [dispatch, alert, error]);

	useEffect(() => {
		dispatch(getOrderDetails(id));
	}, [dispatch, id]);

	return (
		<>
			{loading ? (
				<Loader />
			) : order ? (
				<>
					<MetaData title="Order Details - Saurav Store" />
					<div className="orderDetailsPage">
						<div className="orderDetailsContainer">
							<Typography component="h1">
								Order #{order && order._id}
							</Typography>
							<div className="orderDetailsContainerBox">
								<div>
									<p>Name:</p>
									<span>{order.user && order.user.name}</span>
								</div>
								<div>
									<p>Phone:</p>
									<span>
										{order.shippingInfo && order.shippingInfo.phoneNo}
									</span>
								</div>
								<div>
									<p>Address:</p>
									<span>
										{order.shippingInfo &&
											`${order.shippingInfo.address}, ${order.shippingInfo.city},
										${order.shippingInfo.state}, ${order.shippingInfo.pinCode},
										${order.shippingInfo.country}`}
									</span>
								</div>
							</div>
							<Typography>Payment</Typography>
							<div className="orderDetailsContainerBox">
								<div>
									<p
										className={
											order.paymentInfo &&
											order.paymentInfo.status === "succeeded"
												? "greenColor"
												: "redColor"
										}
									>
										{order.paymentInfo &&
										order.paymentInfo.status === "succeeded"
											? "Paid"
											: "Not Paid"}
									</p>
								</div>
								<div>
									<p>Amount:</p>
									<span>$ {order.totalPrice && order.totalPrice}</span>
								</div>
							</div>
							<Typography>Order Status</Typography>
							<div className="orderDetailsContainerBox">
								<div>
									<p
										className={
											order.orderStatus && order.orderStatus === "Delivered"
												? "greenColor"
												: "redColor"
										}
									>
										{order.orderStatus && order.orderStatus}
									</p>
								</div>
							</div>
						</div>
						<div className="orderDetailsCartItems">
							<Typography>Order Items: </Typography>
							<div className="orderDetailsCartItemsContainer">
								{order.orderItems &&
									order.orderItems.map((item) => (
										<div key={item.product}>
											<img src={item.image} alt={item.name} />
											<Link to={`/product/${item.product}`}>{item.name}</Link>
											<span>
												{item.quantity} X $ {item.price} =
												<b>$ {item.price * item.quantity}</b>
											</span>
										</div>
									))}
							</div>
						</div>
					</div>
				</>
			) : (
				<NotFound />
			)}
		</>
	);
};

export default OrderDetails;
