import { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import WebFont from "webfontloader";
import { useDispatch } from "react-redux";

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
import { loadUser } from "./store/actions/userAction";
import ProtectedRoute from "./components/Route/ProtectedRoute";
import UpdatePassword from "./components/User/UpdatePassword";
import ForgotPassword from "./components/User/ForgotPassword";
import ResetPassword from "./components/User/ResetPassword";

function App() {
	const dispatch = useDispatch();
	useEffect(() => {
		WebFont.load({
			google: {
				families: ["Roboto", "Droidsans", "Chilanka"],
			},
		});
		dispatch(loadUser());
	}, [dispatch]);

	return (
		<Router>
			<Header />
			<Routes>
				<Route exact path="/" element={<Home />} />
				<Route exact path="/product/:id" element={<ProductDetails />} />
				<Route exact path="/products" element={<Products />} />
				<Route path="/products/:keyword" element={<Products />} />
				<Route
					exact
					path="/account"
					element={
						<ProtectedRoute>
							<Profile />
						</ProtectedRoute>
					}
				/>
				<Route
					exact
					path="/me/update"
					element={
						<ProtectedRoute>
							<UpdateProfile />
						</ProtectedRoute>
					}
				/>
				<Route
					exact
					path="/password/update"
					element={
						<ProtectedRoute>
							<UpdatePassword />
						</ProtectedRoute>
					}
				/>
				<Route exact path="/password/forgot" element={<ForgotPassword />} />
				<Route
					exact
					path="/password/reset/:token"
					element={<ResetPassword />}
				/>
				<Route exact path="/search" element={<Search />} />
				<Route exact path="/login" element={<LoginSignup />} />
			</Routes>
			<Footer />
		</Router>
	);
}

export default App;
