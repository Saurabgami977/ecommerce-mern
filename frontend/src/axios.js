import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:4000" });

export const fetchPost = (keyword, currentPage, price) =>
	API.get(
		// `/api/v1/products?keyword=${keyword}&page=${currentPage}`,
		`/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gt]=${price[0]}&price[lt]=${price[1]}`,
	);
export const fetchPostDetails = (id) => API.get(`/api/v1/product/${id}`);
