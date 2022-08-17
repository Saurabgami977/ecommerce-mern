import {
	CLEAR_ERRORS,
	UPDATE_PROFILE_REQUEST,
	UPDATE_PROFILE_SUCCESS,
	UPDATE_PROFILE_FAIL,
	UPDATE_PROFILE_RESET,
	UPDATE_PASSWORD_REQUEST,
	UPDATE_PASSWORD_SUCCESS,
	UPDATE_PASSWORD_RESET,
	UPDATE_PASSWORD_FAIL,
	FORGOT_PASSWORD_REQUEST,
	FORGOT_PASSWORD_SUCCESS,
	FORGOT_PASSWORD_FAIL,
} from "../constants/updateProfileConstant";

export const profileReducer = (state = {}, action) => {
	switch (action.type) {
		case UPDATE_PASSWORD_REQUEST:
		case UPDATE_PROFILE_REQUEST:
			return {
				...state,
				loading: true,
			};
		case UPDATE_PASSWORD_SUCCESS:
		case UPDATE_PROFILE_SUCCESS:
			return {
				...state,
				loading: false,
				isUpdated: action.payload,
			};
		case UPDATE_PASSWORD_RESET:
		case UPDATE_PROFILE_RESET:
			return {
				...state,
				isUpdated: false,
			};
		case UPDATE_PASSWORD_FAIL:
		case UPDATE_PROFILE_FAIL:
			return {
				...state,
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

export const forgotPasswordReducer = (state = {}, action) => {
	switch (action.type) {
		case FORGOT_PASSWORD_REQUEST:
			return {
				...state,
				loading: true,
				error: null,
			};
		case FORGOT_PASSWORD_SUCCESS:
			return {
				...state,
				loading: false,
				message: action.payload.message,
				success: action.payload.success,
			};
		case FORGOT_PASSWORD_FAIL:
			return {
				...state,
				loading: false,
				error: action.message,
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
