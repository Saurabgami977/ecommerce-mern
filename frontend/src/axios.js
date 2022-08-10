import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:4000" });

export const fetchPost = (keyword, currentPage, price, category, ratings) => {
	if (category) {
		return API.get(
			`/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gt]=${price[0]}&price[lt]=${price[1]}&category=${category}&ratings[gt]=${ratings}`,
		);
	}
	return API.get(
		// `/api/v1/products?keyword=${keyword}&page=${currentPage}`,
		`/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gt]=${price[0]}&price[lt]=${price[1]}&ratings[gt]=${ratings}`,
	);
};
export const fetchPostDetails = (id) => API.get(`/api/v1/product/${id}`);
