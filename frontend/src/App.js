import { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import WebFont from "webfontloader";

import "./App.css";
import store from "./store";
import Footer from "./components/Layout/Footer/Footer";
import Header from "./components/Layout/Header/Header";
import Home from "./components/Home/Home";
import ProductDetails from "./components/Product/ProductDetails.js";
import Products from "./components/Product/Products.js";
import Search from "./components/Product/Search.js";
import LoginSignup from "./components/User/LoginSignup";
import Profile from "./components/User/Profile";
import { loadUser } from "./store/actions/userAction";

function App() {
	useEffect(() => {
		WebFont.load({
			google: {
				families: ["Roboto", "Droidsans", "Chilanka"],
			},
		});
		store.dispatch(loadUser());
	}, []);

	return (
		<Router>
			<Header />
			<Routes>
				<Route exact path="/" element={<Home />} />
				<Route exact path="/product/:id" element={<ProductDetails />} />
				<Route exact path="/products" element={<Products />} />
				<Route path="/products/:keyword" element={<Products />} />

				<Route exact path="/account" element={<Profile />} />

				<Route exact path="/search" element={<Search />} />
				<Route exact path="/login" element={<LoginSignup />} />
			</Routes>
			<Footer />
		</Router>
	);
}

export default App;
