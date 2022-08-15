import {
	CLEAR_ERRORS,
	LOGIN_FAIL,
	LOGIN_REQUEST,
	LOGIN_SUCCESS,
	REGISTER_REQUEST,
	REGISTER_SUCCESS,
	REGISTER_FAIL,
} from "../constants/userConstant";

import { loginAPI, registerAPI } from "../../axios";

export const login = (email, password) => async (dispatch) => {
	try {
		dispatch({ type: LOGIN_REQUEST });

		const { data } = await loginAPI(email, password);
		dispatch({ type: LOGIN_SUCCESS, payload: data.user });
	} catch (error) {
		dispatch({
			type: LOGIN_FAIL,
			payload: error.response.data.message,
		});
	}
};

export const register =
	({ name, email, password, avatar }) =>
	async (dispatch) => {
		try {
			dispatch({ type: REGISTER_REQUEST });
			const { data } = await registerAPI({ name, email, password, avatar });
			dispatch({ type: REGISTER_SUCCESS, payload: data.user });
		} catch (error) {
			dispatch({
				type: REGISTER_FAIL,
				payload: error.response.data.message,
			});
		}
	};

export const clearErrors = () => async (dispatch) => {
	dispatch({ type: CLEAR_ERRORS });
};
