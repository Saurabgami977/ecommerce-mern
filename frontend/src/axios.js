import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:4000" });
// const API = axios.create({
// 	baseURL: "https://memories-app-saurab.herokuapp.com",
// });

// API.interceptors.request.use((req) => {
// 	if (localStorage.getItem("profile")) {
// 		req.headers.Authorization =
// 			"Bearer " + JSON.parse(localStorage.getItem("profile")).token;
// 	}

// 	return req;
// });

export const fetchPost = (id) => API.get(`/api/v1/products`);
