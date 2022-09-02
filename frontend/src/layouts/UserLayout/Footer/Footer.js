import React from "react";
import playStore from "../../../images/playstore.png";
import appStore from "../../../images/appstore.png";
import "./Footer.css";
import { useLocation } from "react-router-dom";

const Footer = () => {
	const location = useLocation();

	if (location.pathname.split("/")[1] === "admin") {
		return;
	}

	return (
		<footer id="footer">
			<div className="leftFooter">
				<h4>DOWNLOAD OUR APP</h4>
				<p>Download App for Android and IOS mobile phone</p>
				<img src={playStore} alt="playstore" />
				<img src={appStore} alt="Appstore" />
			</div>

			<div className="midFooter">
				<h1>ECOMMERCE.</h1>
				<p>High Quality is our first priority</p>

				<p>Copyrights 2021 &copy; Saurab</p>
			</div>

			<div className="rightFooter">
				<h4>Follow Us</h4>
				<a href="https://instagram.com/saurabhgami01">Instagram</a>
				<a href="https://github.com/Saurabgami977/ecommerce-mern/">Github</a>
				<a href="http://instagram.com/saurabhgami01">Facebook</a>
			</div>
		</footer>
	);
};

export default Footer;
