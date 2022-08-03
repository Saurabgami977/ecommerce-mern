import { CHANGE_SEARCH_MODAL_STATUS } from "../constants/modalConstant.js";

export const searchModalReducer = (state = { modalStatus: false }, action) => {
	switch (action.type) {
		case CHANGE_SEARCH_MODAL_STATUS:
			return {
				modalStatus: action.payload,
			};

		default:
			return state;
	}
};
