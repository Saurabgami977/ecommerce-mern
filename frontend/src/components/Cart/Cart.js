import React from "react";

import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { Link } from "react-router-dom";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import Typography from "@mui/material/Typography";

import "./Cart.css";
import CartItemCard from "./CartItemCard";
import {
	addItemsToCart,
	removeItemsFromCart,
} from "../../store/actions/cartActions";

const Cart = () => {
	const dispatch = useDispatch();
	const alert = useAlert();
	const { cartItems } = useSelector((state) => state.cart);

	const increaseQuantity = (id, quantity, stock) => {
		const newQty = quantity + 1;
		if (stock <= quantity) {
			return alert.error("Out of stock");
		}

		dispatch(addItemsToCart(id, newQty));
	};
	const decreaseQuantity = (id, quantity) => {
		const newQty = quantity - 1;
		if (1 >= quantity) {
			return alert.error("Item quantity cannot be less than 1");
		}

		dispatch(addItemsToCart(id, newQty));
	};

	const deleteCartItems = (id) => {
		dispatch(removeItemsFromCart(id));
		alert.success("Item removed from cart");
	};

	return (
		<>
			{cartItems.length === 0 ? (
				<div className="emptyCart">
					<RemoveShoppingCartIcon />
					<Typography>No Product in Your Cart</Typography>
					<Link to="/products">View Products</Link>
				</div>
			) : (
				<>
					<div className="cartPage">
						<div className="cartHeader">
							<p>Product</p>
							<p>Quantity</p>
							<p>Subtotal</p>
						</div>

						{cartItems &&
							cartItems.map((item) => (
								<div className="cartContainer" key={item.product}>
									<CartItemCard item={item} deleteCartItems={deleteCartItems} />
									<div className="cartInput">
										<button
											onClick={() =>
												decreaseQuantity(item.product, item.quantity)
											}
										>
											-
										</button>
										<input type="number" value={item.quantity} readOnly />
										<button
											onClick={() =>
												increaseQuantity(
													item.product,
													item.quantity,
													item.stock,
												)
											}
										>
											+
										</button>
									</div>
									<p className="cartSubTotal">{`$ ${
										item.price * item.quantity
									}`}</p>
								</div>
							))}

						<div className="cartGrossTotal">
							<div></div>
							<div className="cartGrossTotalBox">
								<p>Gross Total</p>
								<p>{"$ 10000"}</p>
							</div>
							<div></div>
							<div className="checkoutBtn">
								<button>Checkout</button>
							</div>
						</div>
					</div>
				</>
			)}
		</>
	);
};

export default Cart;
