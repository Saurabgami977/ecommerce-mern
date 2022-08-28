import { configureStore } from "@reduxjs/toolkit";

// Reducers
import {
	newReviewReducer,
	productDetailsReducer,
	productReducer,
} from "./store/reducers/productReducer";
import { userReducer } from "./store/reducers/userReducer";
import {
	forgotPasswordReducer,
	profileReducer,
} from "./store/reducers/updateProfileReducer";
import { cartReducer } from "./store/reducers/cartReducer";
import {
	myOrdersReducer,
	newOrderReducer,
	orderDetailsReducer,
} from "./store/reducers/orderReducer";
import { adminOrdersReducer } from "./store/reducers/adminOrdersReducer";

let initialState = {
	cart: {
		cartItems: localStorage.getItem("cartItems")
			? JSON.parse(localStorage.getItem("cartItems"))
			: [],
		shippingInfo: localStorage.getItem("shippingInfo")
			? JSON.parse(localStorage.getItem("shippingInfo"))
			: {},
	},
};

const store = configureStore({
	reducer: {
		products: productReducer,
		productDeatails: productDetailsReducer,
		userReducer: userReducer,
		profileReducer: profileReducer,
		forgotPasswordReducer: forgotPasswordReducer,
		cart: cartReducer,
		newOrderReducer: newOrderReducer,
		myOrdersReducer: myOrdersReducer,
		orderDetailsReducer: orderDetailsReducer,
		newReviewReducer: newReviewReducer,
		adminOrdersReducer: adminOrdersReducer,
	},
	preloadedState: initialState,
});

export default store;
