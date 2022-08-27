import {
	GET_ALL_ADMIN_ORDER_REQUEST,
	GET_ALL_ADMIN_ORDER_SUCCESS,
	GET_ALL_ADMIN_ORDER_FAIL,
	CLEAR_ERRORS,
} from "../constants/adminOrderConstant";

export const adminOrdersReducer = (state = { orders: [] }, action) => {
	switch (action.type) {
		case GET_ALL_ADMIN_ORDER_REQUEST:
			return {
				loading: true,
			};
		case GET_ALL_ADMIN_ORDER_SUCCESS:
			return {
				loading: false,
				orders: action.payload.orders,
				success: true,
				totalAmount: action.payload.totalAmount,
			};
		case GET_ALL_ADMIN_ORDER_FAIL:
			return {
				loading: false,
				error: action.payload,
			};
		case CLEAR_ERRORS:
			return {
				...state,
				error: null,
			};
		default:
			return state;
	}
};
