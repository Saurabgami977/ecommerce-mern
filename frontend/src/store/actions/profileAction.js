import {
	CLEAR_ERRORS,
	UPDATE_PROFILE_REQUEST,
	UPDATE_PROFILE_SUCCESS,
	UPDATE_PROFILE_FAIL,
} from "../constants/profileConstant";

import { updateUserAPI } from "../../axios";

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

// CLEAR ERRORS
export const clearErrors = () => async (dispatch) => {
	dispatch({ type: CLEAR_ERRORS });
};
