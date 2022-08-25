import { createOrderApi, getOrderDetailsApi, myOrdersApi } from "../../axios";
import {
	CREATE_ORDER_FAIL,
	CREATE_ORDER_REQUEST,
	CREATE_ORDER_SUCCESS,
	MY_ORDER_REQUEST,
	MY_ORDER_SUCCESS,
	MY_ORDER_FAIL,
	ORDER_DETAILS_REQUEST,
	ORDER_DETAILS_SUCCESS,
	ORDER_DETAILS_FAIL,
	CLEAR_ERRORS,
} from "../constants/orderConstant";

// Create Order
export const createOrder = (order) => async (dispatch) => {
	try {
		dispatch({ type: CREATE_ORDER_REQUEST });
		const { data } = await createOrderApi(order);

		dispatch({ type: CREATE_ORDER_SUCCESS, payload: data });
	} catch (error) {
		dispatch({ type: CREATE_ORDER_FAIL, payload: error.response.data.message });
	}
};

export const clearErrors = () => async (dispatch) => {
	dispatch({ type: CLEAR_ERRORS });
};

// My Orders
export const myOrders = () => async (dispatch) => {
	try {
		dispatch({ type: MY_ORDER_REQUEST });
		const { data } = await myOrdersApi();

		dispatch({ type: MY_ORDER_SUCCESS, payload: data.orders });
	} catch (error) {
		dispatch({ type: MY_ORDER_FAIL, payload: error.response.data.message });
	}
};

// Order Details
export const getOrderDetails = (id) => async (dispatch) => {
	try {
		dispatch({ type: ORDER_DETAILS_REQUEST });
		const { data } = await getOrderDetailsApi(id);

		dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data.order });
	} catch (error) {
		dispatch({
			type: ORDER_DETAILS_FAIL,
			payload: error.response.data.message,
		});
	}
};
