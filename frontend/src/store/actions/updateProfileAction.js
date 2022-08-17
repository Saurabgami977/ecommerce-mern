import {
	CLEAR_ERRORS,
	UPDATE_PROFILE_REQUEST,
	UPDATE_PROFILE_SUCCESS,
	UPDATE_PROFILE_FAIL,
	UPDATE_PASSWORD_REQUEST,
	UPDATE_PASSWORD_SUCCESS,
	UPDATE_PASSWORD_FAIL,
	FORGOT_PASSWORD_REQUEST,
	FORGOT_PASSWORD_SUCCESS,
	FORGOT_PASSWORD_FAIL,
	RESET_PASSWORD_REQUEST,
	RESET_PASSWORD_SUCCESS,
	RESET_PASSWORD_FAIL,
} from "../constants/updateProfileConstant";

import {
	forgotPasswordAPI,
	updatePasswordAPI,
	updateUserAPI,
	resetPasswordAPI,
} from "../../axios";

// Update Profile
export const updateProfile = (userData) => async (dispatch) => {
	try {
		dispatch({ type: UPDATE_PROFILE_REQUEST });
		const { data } = await updateUserAPI(userData);
		dispatch({ type: UPDATE_PROFILE_SUCCESS, payload: data.success });
	} catch (error) {
		dispatch({
			type: UPDATE_PROFILE_FAIL,
			payload: error.response.data.message,
		});
	}
};

// Update Password
export const updatePassword = (passwords) => async (dispatch) => {
	try {
		dispatch({ type: UPDATE_PASSWORD_REQUEST });
		const { data } = await updatePasswordAPI(passwords);
		dispatch({ type: UPDATE_PASSWORD_SUCCESS, payload: data.success });
	} catch (error) {
		dispatch({
			type: UPDATE_PASSWORD_FAIL,
			payload: error.response.data.message,
		});
	}
};

// Forgot Password
export const forgotPassword = (email) => async (dispatch) => {
	try {
		dispatch({ type: FORGOT_PASSWORD_REQUEST });
		const { data } = await forgotPasswordAPI(email);
		dispatch({ type: FORGOT_PASSWORD_SUCCESS, payload: data });
	} catch (error) {
		dispatch({
			type: FORGOT_PASSWORD_FAIL,
			payload: error.response.data.message,
		});
	}
};

// Reset Password
export const resetPassword =
	(token, password, confirmPassword) => async (dispatch) => {
		try {
			dispatch({ type: RESET_PASSWORD_REQUEST });
			const { data } = await resetPasswordAPI(token, password, confirmPassword);
			dispatch({ type: RESET_PASSWORD_SUCCESS, payload: data.success });
		} catch (error) {
			dispatch({
				type: RESET_PASSWORD_FAIL,
				payload: error.response.data.message,
			});
		}
	};

// CLEAR ERRORS
export const clearErrors = () => async (dispatch) => {
	dispatch({ type: CLEAR_ERRORS });
};
