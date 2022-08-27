import axios from "axios";

const API = axios.create({
	baseURL:
		process.env.REACT_APP_ENV === "DEVELOPMENT"
			? process.env.REACT_APP_DEV_API
			: process.env.REACT_APP_BACKEND_API,
	withCredentials: true,
});

// FETCHING ALL POSTS
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

// FETCHING POST BY ID
export const fetchPostDetails = (id) => API.get(`/api/v1/product/${id}`);

// CONFIG FOR POST REQUEST
const config = { headers: { "Content-Type": "application/json" } };

// LOGIN USER
export const loginAPI = (email, password) =>
	API.post("/api/v1/login", { email, password }, config);

// CONFIG FOR REGESTERING USER
const registerConfig = { headers: { "Content-Type": "multipart/form-data" } };

// REGESTER USER
export const registerAPI = ({ name, email, password, avatar }) =>
	API.post(
		"/api/v1/register",
		{ name, email, password, avatar },
		registerConfig,
	);

// LOAD USER FROM TOKEN
export const loadUserApi = () => API.get("/api/v1/me");

// LOGOUT USER
export const logoutUserAPI = () => API.get("/api/v1/logout");

// Update User
export const updateUserAPI = (userData) =>
	API.put("/api/v1/me/update", userData, registerConfig);

// Update Password
export const updatePasswordAPI = (passwords) =>
	API.put("/api/v1/password/update", passwords, config);

// Forgot Password
export const forgotPasswordAPI = (email) =>
	API.post("/api/v1/password/forgot", email, config);

// Reset Password
export const resetPasswordAPI = (token, password, confirmPassword) =>
	API.put(
		`/api/v1/password/reset/${token}`,
		{ password, confirmPassword },
		config,
	);

// Receive Stripe API key
export const fetchStripeApiKey = () => API.get(`/api/v1/stripeapikey`);

// Process Payment
export const processPaymentApi = (paymentData) =>
	API.post("/api/v1/payment/process", paymentData, config);

// Create New Order
export const createOrderApi = (order) =>
	API.post("/api/v1/order/new", order, config);

// My Orders
export const myOrdersApi = () => API.get("/api/v1/orders/me");

// Order Details API
export const getOrderDetailsApi = (id) => API.get(`/api/v1/order/${id}`);

// New Review API
export const newReviewAPI = (reviewData) =>
	API.put("/api/v1/review", reviewData, config);

// ---------------------------ADMIN------------------------------

// Get all orders --admin
export const getAllAdminOrders = () => API.get("/api/v1/admin/orders", config);
