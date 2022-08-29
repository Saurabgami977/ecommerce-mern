import React, { useEffect, useRef, useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import { Typography } from "@mui/material";
import { useAlert } from "react-alert";
import {
	CardCvcElement,
	CardNumberElement,
	CardExpiryElement,
	useStripe,
	useElements,
} from "@stripe/react-stripe-js";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import EventIcon from "@mui/icons-material/Event";
import VpnKeyIcon from "@mui/icons-material/VpnKey";

import { useNavigate } from "react-router-dom";

import MetaData from "../Layout/MetaData";
import CheckoutSteps from "./CheckoutSteps";

import "./css/Payment.css";
import { processPaymentApi } from "../../axios";
import { clearErrors, createOrder } from "../../store/actions/orderAction";

const Payment = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const alert = useAlert();
	const stripe = useStripe();
	const elements = useElements();
	const payBtn = useRef(null);

	const { shippingInfo, cartItems } = useSelector((state) => state.cart);
	const { user } = useSelector((state) => state.userReducer);
	const { error } = useSelector((state) => state.newOrderReducer);
	const [loading, setLoading] = useState(false);

	const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));

	const paymentData = {
		amount: Math.round(orderInfo.totalPrice * 100),
	};

	const order = {
		shippingInfo,
		orderItems: cartItems,
		itemsPrice: orderInfo.subTotal,
		taxPrice: orderInfo.tax,
		shippingPrice: orderInfo.shippingCharges,
		totalPrice: orderInfo.totalPrice,
	};

	useEffect(() => {
		if (error) {
			alert.show(error);
			return dispatch(clearErrors());
		}
	}, [dispatch, alert, error]);

	const submitHandler = async (e) => {
		e.preventDefault();
		payBtn.current.disabled = true;
		try {
			setLoading(true);

			const { data } = await processPaymentApi(paymentData);

			const client_secret = data.client_secret;

			if (!stripe || !elements) return;

			const result = await stripe.confirmCardPayment(client_secret, {
				payment_method: {
					card: elements.getElement(CardNumberElement),
					billing_details: {
						name: user.name,
						email: user.email,
						address: {
							line1: shippingInfo.address,
							city: shippingInfo.city,
							state: shippingInfo.state,
							postal_code: shippingInfo.pinCode,
							country: shippingInfo.country,
						},
					},
				},
			});

			if (result.error) {
				setLoading(false);
				payBtn.current.disabled = false;
				alert.error(result.error.message);
			} else {
				if (result.paymentIntent.status === "succeeded") {
					setLoading(false);
					order.paymentInfo = {
						id: result.paymentIntent.id,
						status: result.paymentIntent.status,
					};

					dispatch(createOrder(order));
					navigate("/success");
				} else {
					setLoading(false);
					alert.error("There is some issue while processing payment");
				}
			}
			setLoading(false);
		} catch (error) {
			setLoading(false);
			payBtn.current.disabled = false;
			alert.error(error);
			console.log(error);
		}
	};

	return (
		<>
			<MetaData title="Payment" />
			<CheckoutSteps activeSteps={2} />

			<div className="paymentContainer">
				<form onSubmit={(e) => submitHandler(e)} className="paymentForm">
					<Typography>Card Info</Typography>
					<Typography color="red" textAlign="center" variant="subtitle2">
						Please do not pay with your card on this site, This is built for
						sole purpose of testing.
					</Typography>
					<Typography textAlign="center" variant="caption">
						Test Card: 4242 4242 4242 4242
					</Typography>
					<div>
						<CreditCardIcon />
						<CardNumberElement className="paymentInput" />
					</div>
					<div>
						<EventIcon />
						<CardExpiryElement className="paymentInput" />
					</div>
					<div>
						<VpnKeyIcon />
						<CardCvcElement className="paymentInput" />
					</div>
					<input
						type="submit"
						value={
							loading
								? "Loading.........."
								: `Pay - $${orderInfo && orderInfo.totalPrice}`
						}
						ref={payBtn}
						className="paymentFormBtn"
					/>
				</form>
			</div>
		</>
	);
};

export default Payment;
