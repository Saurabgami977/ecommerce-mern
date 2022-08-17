import {
	CLEAR_ERRORS,
	UPDATE_PROFILE_REQUEST,
	UPDATE_PROFILE_SUCCESS,
	UPDATE_PROFILE_FAIL,
	UPDATE_PASSWORD_REQUEST,
	UPDATE_PASSWORD_SUCCESS,
	UPDATE_PASSWORD_FAIL,
} from "../constants/updateProfileConstant";

import { updatePasswordAPI, updateUserAPI } from "../../axios";

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

// CLEAR ERRORS
export const clearErrors = () => async (dispatch) => {
	dispatch({ type: CLEAR_ERRORS });
};
