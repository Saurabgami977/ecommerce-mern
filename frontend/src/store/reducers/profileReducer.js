import {
	CLEAR_ERRORS,
	UPDATE_PROFILE_REQUEST,
	UPDATE_PROFILE_SUCCESS,
	UPDATE_PROFILE_FAIL,
	UPDATE_PROFILE_RESET,
} from "../constants/profileConstant";

export const profileReducer = (state = {}, action) => {
	switch (action.type) {
		case UPDATE_PROFILE_REQUEST:
			return {
				...state,
				loading: true,
			};
		case UPDATE_PROFILE_SUCCESS:
			return {
				...state,
				loading: false,
				isUpdated: action.payload,
			};
		case UPDATE_PROFILE_RESET:
			return {
				...state,
				isUpdated: false,
			};
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
