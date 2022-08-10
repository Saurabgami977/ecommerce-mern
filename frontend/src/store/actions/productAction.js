import { fetchPost, fetchPostDetails } from "../../axios";

import {
	ALL_PRODUCT_FAIL,
	ALL_PRODUCT_REQUEST,
	ALL_PRODUCT_SUCCESS,
	CLEAR_ERRORS,
	PRODUCT_DETAILS_FAIL,
	PRODUCT_DETAILS_REQUEST,
	PRODUCT_DETAILS_SUCCESS,
} from "../constants/productConstants";

export const getProduct =
	(keyword = "", currentPage = 1, price = [0, 25000], category, ratings = 0) =>
	async (dispatch) => {
		dispatch({ type: ALL_PRODUCT_REQUEST });
		try {
			dispatch({ type: ALL_PRODUCT_REQUEST });

			const { data } = await fetchPost(
				keyword,
				currentPage,
				price,
				category,
				ratings,
			);

			dispatch({ type: ALL_PRODUCT_SUCCESS, payload: data });
		} catch (error) {
			dispatch({
				type: ALL_PRODUCT_FAIL,
				payload: error.response.data.message,
			});
		}
	};

export const getProductDetails = (id) => async (dispatch) => {
	dispatch({ type: PRODUCT_DETAILS_REQUEST });
	try {
		dispatch({ type: PRODUCT_DETAILS_REQUEST });

		const { data } = await fetchPostDetails(id);

		dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data.product });
	} catch (error) {
		dispatch({
			type: PRODUCT_DETAILS_FAIL,
			payload: error.response.data.message,
		});
	}
};

export const clearErrors = () => async (dispatch) => {
	dispatch({ type: CLEAR_ERRORS });
};
