import { fetchPostDetails } from "../../axios";
import {
	ADD_TO_CART,
	REMOVE_CART_ITEM,
	SAVE_SHIPPING_INFO,
} from "../constants/cartConstant";

// Add to cart
export const addItemsToCart = (id, quantity) => async (dispatch, getState) => {
	const { data } = await fetchPostDetails(id);

	dispatch({
		type: ADD_TO_CART,
		payload: {
			product: data.product._id,
			name: data.product.name,
			price: data.product.price,
			image: data.product.images[0].url,
			stock: data.product.stock,
			quantity,
		},
	});

	localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

// Remove from Cart

export const removeItemsFromCart = (id) => async (dispatch, getState) => {
	dispatch({
		type: REMOVE_CART_ITEM,
		payload: id,
	});

	localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

// Save Shipping info

export const saveShippingInfo = (info) => async (dispatch) => {
	dispatch({
		type: SAVE_SHIPPING_INFO,
		payload: info,
	});

	localStorage.setItem("shippingInfo", JSON.stringify(info));
};
