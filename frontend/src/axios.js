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

const config = { headers: { "Content-Type": "application/json" } };

export const loginAPI = (email, password) =>
	API.post("/api/v1/login", { email, password }, config);

const registerConfig = { headers: { "Content-Type": "multipart/form-data" } };

export const registerAPI = (name, email, password) =>
	API.post("/api/v1/register", { name, email, password }, registerConfig);
export const logout = () => API.post("/api/v1/logout");
export const addToCart = (productId) => API.post("/api/v1/cart", { productId });
export const getCart = () => API.get("/api/v1/cart");
export const removeFromCart = (productId) =>
	API.delete(`/api/v1/cart/${productId}`);
export const updateCart = (productId, quantity) =>
	API.put(`/api/v1/cart/${productId}`, { quantity });
export const checkout = (data) => API.post("/api/v1/checkout", data);
export const getOrders = () => API.get("/api/v1/orders");
export const getOrderDetails = (id) => API.get(`/api/v1/order/${id}`);
export const getUserDetails = () => API.get("/api/v1/user");
export const updateUserDetails = (data) => API.put("/api/v1/user", data);
export const updatePassword = (data) => API.put("/api/v1/user/password", data);
export const deleteUser = () => API.delete("/api/v1/user");
export const getCategories = () => API.get("/api/v1/categories");
export const getBrands = () => API.get("/api/v1/brands");
export const getRatings = () => API.get("/api/v1/ratings");
export const getCountries = () => API.get("/api/v1/countries");
export const getStates = (country) =>
	API.get(`/api/v1/states?country=${country}`);
export const getCities = (state) => API.get(`/api/v1/cities?state=${state}`);
