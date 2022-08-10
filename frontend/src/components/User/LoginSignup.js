import React, { useRef, useState } from "react";

import { Link } from "react-router-dom";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LockOpenIcon from "@mui/icons-material/LockOpen";

import "./LoginSignup.css";

const LoginSignup = () => {
	const loginTab = useRef(null);
	const registerTab = useRef(null);
	const switcherTab = useRef(null);

	const [loginEmail, setLoginEmail] = useState("");
	const [loginPassword, setLoginPassword] = useState("");

	const loginSubmit = () => {
		console.log("Form Submitted");
	};

	const switchTab = (e, tab) => {
		if (tab === "login") {
			switcherTab.current.classList.add("shiftToNeutral");
			switcherTab.current.classList.remove("shiftToRight");

			registerTab.current.classList.remove("shiftToNeutralForm");
			registerTab.current.classList.remove("shiftToLeft");
		}
		if (tab === "register") {
			switcherTab.current.classList.add("shiftToRight");
			switcherTab.current.classList.remove("shiftToNeutral");

			registerTab.current.classList.add("shiftToNeutralForm");
			registerTab.current.classList.add("shiftToLeft");
		}
	};

	return (
		<>
			<div className="loginSignupContainer">
				<div className="loginSignupBox">
					<div>
						<div className="login_signup_toggle">
							<p onClick={(e) => switchTab(e, "login")}>Login</p>
							<p onClick={(e) => switchTab(e, "register")}>Register</p>
						</div>
						<button ref={switcherTab}></button>
					</div>
					<form className="loginForm" ref={loginTab} onSubmit={loginSubmit}>
						<div className="loginEmail">
							<MailOutlineIcon />
							<input
								type="email"
								placeholder="Email"
								required
								value={loginEmail}
								onChange={(e) => setLoginEmail(e.target.value)}
							/>
						</div>
						<div className="loginPassword">
							<LockOpenIcon />
							<input
								type="password"
								placeholder="Email"
								required
								value={loginPassword}
								onChange={(e) => setLoginPassword(e.target.value)}
							/>
						</div>
						<Link to="/password/forgot">Forget Password </Link>
						<input type="submit" value="Login" className="loginBtn" />
					</form>
					<form
						ref={registerTab}
						className="signupForm"
						encType="multipart/form-data"
						// onSubmit={registerSubmit}
					>


                    </form>
				</div>
			</div>
		</>
	);
};

export default LoginSignup;
