import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
	productDetailsReducer,
	productReducer,
} from "./store/reducers/productReducer";
import { userReducer } from "./store/reducers/userReducer";
import { profileReducer } from "./store/reducers/updateProfileReducer";

const reducer = combineReducers({
	products: productReducer,
	productDeatails: productDetailsReducer,
	userReducer: userReducer,
	profileReducer: profileReducer,
});

let initialState = {};

const middleWare = [thunk];

const store = createStore(
	reducer,
	initialState,
	composeWithDevTools(applyMiddleware(...middleWare)),
);

export default store;
