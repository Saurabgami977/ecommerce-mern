import React from "react";

import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Typography } from "@mui/material";

import MetaData from "../Layout/MetaData";
import CheckoutSteps from "./CheckoutSteps";
import "./ConfirmOrder.css";

const ConfirmOrder = () => {
	const nagivate = useNavigate();

	const { shippingInfo, cartItems } = useSelector((state) => state.cart);
	const { user } = useSelector((state) => state.userReducer);

	const subTotal = cartItems.reduce(
		(acc, item) => acc + item.quantity * item.price,
		0,
	);
	console.log(cartItems);

	const shippingCharge = subTotal > 1000 ? 0 : 100;

	const tax = (subTotal * 13) / 100;

	const totalPrice = subTotal + tax + shippingCharge;

	const address = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.pinCode}, ${shippingInfo.country}`;

	const proceedToPayment = () => {
		const data = {
			subTotal,
			shippingCharge,
			tax,
			totalPrice,
		};

		sessionStorage.setItem("orderInfo", JSON.stringify(data));

		nagivate("/process/payment");
	};

	return (
		<>
			<MetaData title="Confirm Order" />
			<CheckoutSteps activeSteps={1} />
			<div className="confirmOrderPage">
				<div>
					<div className="confirmshippingArea">
						<Typography>Shipping Info</Typography>
						<div className="confirmshippingAreaBox">
							<div>
								<p>Name:</p>
								<span>{user.name}</span>
							</div>
							<div>
								<p>Phone:</p>
								<span>{shippingInfo.phone}</span>
							</div>
							<div>
								<p>Address:</p>
								<span>{address}</span>
							</div>
						</div>
					</div>
					<div className="confirmCartItems">
						<Typography>Your Cart Items</Typography>
						<div className="confirmCartItemsContainer">
							{cartItems &&
								cartItems.map((item) => (
									<div key={item.product}>
										<img src={item.image} alt={item.name} />
										<Link to={`/product/${item.product}`}>{item.name}</Link>
										<span>
											{item.quantity} X ${item.price}{" "}
											<b>${item.price * item.quantity} </b>
										</span>
									</div>
								))}
						</div>
					</div>
				</div>
				{/* */}
				<div>
					<div className="orderSummary">
						<Typography>Order Summary</Typography>
						<div>
							<div>
								<p>Subtotal:</p>
								<span>${subTotal}</span>
							</div>
							<div>
								<p>Shipping Charges:</p>
								<span>${shippingCharge}</span>
							</div>
							<div>
								<p>Tax</p>
								<span>${tax}</span>
							</div>
						</div>
						<div className="orderSummaryTotal">
							<p>
								<b>Total:</b>
							</p>
							<span>${totalPrice}</span>
						</div>
						<button onClick={proceedToPayment}>Procees To Payment</button>
					</div>
				</div>
			</div>
		</>
	);
};

export default ConfirmOrder;
