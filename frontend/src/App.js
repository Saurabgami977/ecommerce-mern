import { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import WebFont from "webfontloader";

import "./App.css";
import Footer from "./components/Layout/Footer/Footer";
import Header from "./components/Layout/Header/Header";
import Home from "./components/Home/Home";

function App() {
	useEffect(() => {
		WebFont.load({
			google: {
				families: ["Roboto", "Droidsans", "Chilanka"],
			},
		});
	});

	return (
		<Router>
			{/* <Header /> */}
			<Routes>
				<Route path="/" element={<Home />} />
			</Routes>
			<Footer />
		</Router>
	);
}

export default App;
