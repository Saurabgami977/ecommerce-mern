import {
	GET_ALL_ADMIN_ORDER_REQUEST,
	GET_ALL_ADMIN_ORDER_SUCCESS,
	GET_ALL_ADMIN_ORDER_FAIL,
} from "../constants/adminOrderConstant";

import { getAllAdminOrders } from "../../axios";

// My Orders
export const adminOrdersAction = () => async (dispatch) => {
	try {
		dispatch({ type: GET_ALL_ADMIN_ORDER_REQUEST });
		const { data } = await getAllAdminOrders();

		dispatch({ type: GET_ALL_ADMIN_ORDER_SUCCESS, payload: data });
	} catch (error) {
		dispatch({
			type: GET_ALL_ADMIN_ORDER_FAIL,
			payload: error.response.data.message,
		});
	}
};
