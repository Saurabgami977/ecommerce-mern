import { createOrderApi, myOrdersApi } from "../../axios";
import {
	CREATE_ORDER_FAIL,
	CREATE_ORDER_REQUEST,
	CREATE_ORDER_SUCCESS,
	MY_ORDER_REQUEST,
	MY_ORDER_SUCCESS,
	MY_ORDER_FAIL,
	CLEAR_ERRORS,
} from "../constants/orderConstant";

// Create Order
export const createOrder = (order) => async (dispatch, getState) => {
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
