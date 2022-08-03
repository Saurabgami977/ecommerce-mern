import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
	productDetailsReducer,
	productReducer,
} from "./store/reducers/productReducer";
import { searchModalReducer } from "./store/reducers/searchModalReducer";

const reducer = combineReducers({
	products: productReducer,
	productDeatails: productDetailsReducer,
	searchModalStatus: searchModalReducer,
});

let initialState = {};

const middleWare = [thunk];

const store = createStore(
	reducer,
	initialState,
	composeWithDevTools(applyMiddleware(...middleWare)),
);

export default store;
