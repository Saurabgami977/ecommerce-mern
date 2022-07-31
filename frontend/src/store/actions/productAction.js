import { fetchPost } from "../../axios";

import {
	ALL_PRODUCT_FAIL,
	ALL_PRODUCT_REQUEST,
	ALL_PRODUCT_SUCCESS,
	CLEAR_ERRORS,
} from "../constants/productConstants";

export const getProduct = async (dispatch) => {
	dispatch({ type: ALL_PRODUCT_REQUEST });
	try {
		dispatch({ type: ALL_PRODUCT_REQUEST });

		const { data } = await fetchPost();

		dispatch({ type: ALL_PRODUCT_SUCCESS, payload: data });
	} catch (error) {
		dispatch({ type: ALL_PRODUCT_FAIL, payload: error.response.data.message });
	}
};

export const clearErrors = () => async (dispatch) => {
	dispatch({ type: CLEAR_ERRORS });
};
