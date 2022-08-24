import React, { useEffect, useRef } from "react";

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

import MetaData from "../Layout/MetaData";
import CheckoutSteps from "./CheckoutSteps";

import "./Payment.css";
import { processPaymentApi } from "../../axios";
import { useNavigate } from "react-router-dom";

const Payment = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const alert = useAlert();
	const stripe = useStripe();
	const elements = useElements();
	const payBtn = useRef(null);

	const { shippingInfo, cartItems } = useSelector((state) => state.cart);
	const { user } = useSelector((state) => state.userReducer);

	const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));

	const paymentData = {
		amount: Math.round(orderInfo.totalPrice * 100),
	};

	const submitHandler = async (e) => {
		e.preventDefault();
		payBtn.current.disabled = true;
		try {
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
				payBtn.current.disabled = false;
			} else {
				if (result.paymentIntent.status === "succeeded") {
					navigate("/success");
				} else {
					alert.error("There is some issue while processing payment");
				}
			}

			alert.error(result.error.message);
		} catch (error) {
			payBtn.current.disabled = false;
			alert.error(error.response.data.message);
		}
	};

	return (
		<>
			<MetaData title="Payment" />
			<CheckoutSteps activeSteps={2} />

			<div className="paymentContainer">
				<form onSubmit={(e) => submitHandler(e)} className="paymentForm">
					<Typography>Card Info</Typography>
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
						value={`Pay - $${orderInfo && orderInfo.totalPrice}`}
						ref={payBtn}
						className="paymentFormBtn"
					/>
				</form>
			</div>
		</>
	);
};

export default Payment;
