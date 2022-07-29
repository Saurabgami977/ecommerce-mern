import React from "react";
import playstore from "../../../images/downloadFromGooglePlayStore.png";
import appstore from "../../../images/downloadFromAppstore.png";

import "./footer.css";

const Footer = () => {
	return (
		<footer id="footer">
			<div className="leftFooter">
				<h4>DOWNLOAD OUR APP</h4>
				<p>Download our Apps for Android and IOS mobile phone</p>
				<img src={playstore} alt="Playstore" />
				<img src={appstore} alt="Appstore" />
			</div>
			<div className="midFooter">
				<h1>Ecommerce</h1>
				<p>High quality is our first priority</p>
				<p>Copyrights 2021 &copy; Saurab</p>
			</div>
			<div className="rightFooter">
				<h4>Follow Us</h4>
				<a href="https://facebook.com">Facebook</a>
				<a href="https://instagram.com">Instagram</a>
				<a href="https://youtube.com">Youtube</a>
			</div>
		</footer>
	);
};

export default Footer;
