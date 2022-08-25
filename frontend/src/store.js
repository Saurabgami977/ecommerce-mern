import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
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

const reducer = combineReducers({
	products: productReducer,
	productDeatails: productDetailsReducer,
	userReducer: userReducer,
	profileReducer: profileReducer,
	forgotPasswordReducer: forgotPasswordReducer,
	cart: cartReducer,
	newOrderReducer: newOrderReducer,
	myOrdersReducer: myOrdersReducer,
	orderDetailsReducer: orderDetailsReducer,
});

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

const middleWare = [thunk];

const store = createStore(
	reducer,
	initialState,
	composeWithDevTools(applyMiddleware(...middleWare)),
);

export default store;
