import { createOrderApi } from "../../axios";
import {
	CREATE_ORDER_FAIL,
	CREATE_ORDER_REQUEST,
	CREATE_ORDER_SUCCESS,
	CLEAR_ERRORS,
} from "../constants/orderConstant";

// Create Order
export const createOrder = (order) => async (dispatch, getState) => {
	try {
		dispatch({ type: CREATE_ORDER_REQUEST });
		const { data } = await createOrderApi(order);

		dispatch({ type: CREATE_ORDER_SUCCESS, payload: data });
		console.log(data);
	} catch (error) {
		dispatch({ type: CREATE_ORDER_FAIL, payload: error.response.data.message });
	}
};

export const clearErrors = () => async (dispatch) => {
	dispatch({ type: CLEAR_ERRORS });
};
