import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:4000" });

export const fetchPost = (keyword) =>
	API.get(`/api/v1/products?keyword=${keyword}`);
export const fetchPostDetails = (id) => API.get(`/api/v1/product/${id}`);
