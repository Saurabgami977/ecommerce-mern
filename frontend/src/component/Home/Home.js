import React from "react";
import { CgMouse, GiHomeGarage } from "react-icons/cg";
import "./Home.css";  

const Home = () => {
	return (
		<>
			<div className="banner">
				<p>Welcome to Ecommerce</p>
				<h1>Find Amazing Products Below</h1>

				<a href="#container">
					<button>
						Scroll <CgMouse />{" "}
					</button>
				</a>
			</div>
		</>
	);
};

export default Home;
