import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import WebFont from "webfontloader";

import "./App.css";
import Footer from "./components/Layout/Footer/Footer";
import Header from "./components/Layout/Header/Header";
import Home from "./components/Home/Home";
import ProductDetails from "./components/Product/ProductDetails.js";
import Products from "./components/Product/Products.js";
import Search from "./components/Product/Search.js";
import LoginSignup from "./components/User/LoginSignup";
import Profile from "./components/User/Profile";
import UpdateProfile from "./components/User/UpdateProfile.js";
import ProtectedRoutes from "./components/Route/ProtectedRoutes";
import AdminRoutes from "./components/Route/AdminRoutes";
import UpdatePassword from "./components/User/UpdatePassword";
import ForgotPassword from "./components/User/ForgotPassword";
import ResetPassword from "./components/User/ResetPassword";
import NotFound from "./components/Layout/NotFound/NotFound";
import Cart from "./components/Cart/Cart";
import Shipping from "./components/Cart/Shipping";
import ConfirmOrder from "./components/Cart/ConfirmOrder";
import Payment from "./components/Cart/Payment";
import OrderSuccess from "./components/Cart/OrderSuccess";
import MyOrders from "./components/Order/MyOrders";
import OrderDetails from "./components/Order/OrderDetails";
import { fetchStripeApiKey } from "./axios";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useSelector } from "react-redux";
import ScrollToTop from "./components/ScrollToTop";
import Dashboard from "./components/Dashboard/Dashboard";
import Orders from "./components/Dashboard/AdminOrders";
import AdminProducts from "./components/Dashboard/AdminProducts";
import Users from "./components/Dashboard/Users";
import Contact from "./components/Home/Contact";

function App() {
	const [stripeApiKey, setStripeApiKey] = useState("");
	const { user } = useSelector((state) => state.userReducer);

	async function getStripeApiKey() {
		const { data } = await fetchStripeApiKey();
		setStripeApiKey(data.stripeApiKey);
	}

	useEffect(() => {
		WebFont.load({
			google: {
				families: ["Roboto", "Droidsans", "Chilanka"],
			},
		});
		getStripeApiKey();
	}, [user]);

	window.addEventListener("contextmenu", (e) => e.preventDefault());

	return (
		<Router>
			<Header />
			<ScrollToTop />
			<Routes>
				<Route exact path="/" element={<Home />} />
				<Route exact path="/contact" element={<Contact />} />

				<Route exact path="/product/:id" element={<ProductDetails />} />
				<Route exact path="/products" element={<Products />} />
				<Route path="/products/:keyword" element={<Products />} />
				<Route exact path="/search" element={<Search />} />

				<Route exact path="/cart" element={<Cart />} />

				<Route exact path="/password/forgot" element={<ForgotPassword />} />
				<Route exact path="/login" element={<LoginSignup />} />
				<Route
					exact
					path="/password/reset/:token"
					element={<ResetPassword />}
				/>

				<Route element={<ProtectedRoutes />}>
					<Route exact path="/account" element={<Profile />} />
					<Route exact path="/me/update" element={<UpdateProfile />} />
					<Route exact path="/password/update" element={<UpdatePassword />} />
					<Route exact path="/shipping" element={<Shipping />} />
					<Route exact path="/order/confirm" element={<ConfirmOrder />} />
					<Route exact path="/success" element={<OrderSuccess />} />
					<Route exact path="/orders" element={<MyOrders />} />
					<Route exact path="/order/:id" element={<OrderDetails />} />

					{stripeApiKey && (
						<Route
							exact
							path="/process/payment"
							element={
								<Elements stripe={loadStripe(stripeApiKey)}>
									<Payment />
								</Elements>
							}
						/>
					)}
				</Route>

				<Route element={<AdminRoutes />} path="/admin/">
					<Route exact path="/admin/dashboard" element={<Dashboard />} />
					<Route exact path="/admin/users" element={<Users />} />
					<Route exact path="/admin/products" element={<AdminProducts />} />
					<Route exact path="/admin/orders" element={<Orders />} />
				</Route>

				<Route path="*" element={<NotFound />} />
			</Routes>
			<Footer />
		</Router>
	);
}

export default App;
