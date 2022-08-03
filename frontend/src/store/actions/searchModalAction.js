import { CHANGE_SEARCH_MODAL_STATUS } from "../constants/modalConstant.js";

export const changeModalStatus = (data) => async (dispatch) => {
	dispatch({ type: CHANGE_SEARCH_MODAL_STATUS, payload: data });
};
