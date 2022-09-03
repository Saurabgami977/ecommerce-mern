import { configureStore } from "@reduxjs/toolkit";

// Product Reducers
import {
	newReviewReducer,
	productDetailsReducer,
	productReducer,
} from "./reducers/productReducer";

// User Reducer
import { userReducer } from "./reducers/userReducer";
import {
	forgotPasswordReducer,
	profileReducer,
} from "./reducers/updateProfileReducer";

// Order and Add to cart reducer
import { cartReducer } from "./reducers/cartReducer";
import {
	myOrdersReducer,
	newOrderReducer,
	orderDetailsReducer,
} from "./reducers/orderReducer";

// Admin Reducers
import { adminOrdersReducer } from "./reducers/adminOrdersReducer";
import adminProductsReducer from "./reducers/adminProductsSlice";

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
		adminProductsReducer: adminProductsReducer,
	},
	preloadedState: initialState,
});

export default store;
