import {
	CLEAR_ERRORS,
	LOGIN_FAIL,
	LOGIN_REQUEST,
	LOGIN_SUCCESS,
	REGISTER_REQUEST,
	REGISTER_SUCCESS,
	REGISTER_FAIL,
	LOAD_USER_REQUEST,
	LOAD_USER_SUCCESS,
	LOAD_USER_FAIL,
	LOGOUT_SUCCESS,
	LOGOUT_FAIL,
} from "../constants/userConstant";

import { loadUserApi, loginAPI, logoutUserAPI, registerAPI } from "../../axios";

// LOGIN USER
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

// REGISTER USER
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

// Load User
export const loadUser = () => async (dispatch) => {
	try {
		dispatch({ type: LOAD_USER_REQUEST });

		const { data } = await loadUserApi();
		dispatch({ type: LOAD_USER_SUCCESS, payload: data.user });
	} catch (error) {
		dispatch({
			type: LOAD_USER_FAIL,
			payload: error.response.data.message,
		});
	}
};

// Logout User
export const logoutUser = () => async (dispatch) => {
	try {
		await logoutUserAPI();
		dispatch({ type: LOGOUT_SUCCESS });
	} catch (error) {
		dispatch({
			type: LOGOUT_FAIL,
			payload: error.response.data.message,
		});
	}
};

// CLEAR ERRORS
export const clearErrors = () => async (dispatch) => {
	dispatch({ type: CLEAR_ERRORS });
};
