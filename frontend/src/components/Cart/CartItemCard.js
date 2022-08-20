import React from "react";
import { Link } from "react-router-dom";

import "./CartItemCard.css";

const CartItemCard = ({ item }) => {
	return (
		<>
			<div className="cartItemCard">
				<img src={item.image} alt={item.name} />
				<div>
					<Link to={`/product/${item.product}`}>{item.name}</Link>
					<span>{`Price $${item.price}`}</span>
					<p>Remove</p>
				</div>
			</div>
		</>
	);
};

export default CartItemCard;
