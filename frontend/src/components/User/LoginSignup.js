import React, { useEffect, useRef, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { Link, useLocation, useNavigate } from "react-router-dom";

import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import FaceIcon from "@mui/icons-material/Face";

import "./css/LoginSignup.css";
import Loader from "../Layout/Loader/Loader";
import MetaData from "../Layout/MetaData";

import {
	clearErrors,
	loadUser,
	login,
	register,
} from "../../store/actions/userAction";

const LoginSignup = () => {
	const dispatch = useDispatch();
	const alert = useAlert();
	let location = useLocation();

	const loginTab = useRef(null);
	const registerTab = useRef(null);
	const switcherTab = useRef(null);
	const navigate = useNavigate();

	const { error, loading, isAuthenticated } = useSelector(
		(state) => state.userReducer,
	);

	const [loginEmail, setLoginEmail] = useState("");
	const [loginPassword, setLoginPassword] = useState("");
	const [avatar, setAvatar] = useState();
	const [avatarPreview, setAvatarPreview] = useState("/Profile.png");

	const [user, setUser] = useState({
		name: "",
		email: "",
		password: "",
	});

	const { name, email, password } = user;

	const loginSubmit = (e) => {
		e.preventDefault();
		dispatch(login(loginEmail, loginPassword));
	};

	const registerSubmit = (e) => {
		e.preventDefault();

		const myForm = new FormData();
		myForm.set("name", name);
		myForm.set("email", email);
		myForm.set("password", password);
		myForm.set("avatar", avatar);
		dispatch(register({ name, email, password, avatar }));
	};

	const registerDataChange = (e) => {
		if (e.target.name === "avatar") {
			const reader = new FileReader();
			reader.onload = () => {
				if (reader.readyState === 2) {
					setAvatarPreview(reader.result);
					setAvatar(reader.result);
				}
			};
			reader.readAsDataURL(e.target.files[0]);
		} else {
			setUser({ ...user, [e.target.name]: e.target.value });
		}
	};

	const redirect = location.search ? location.search.split("=")[1] : "/account";

	useEffect(() => {
		if (isAuthenticated) {
			navigate(redirect);
		}
	}, [redirect, isAuthenticated, navigate, location.pathname]);

	useEffect(() => {
		if (error) {
			alert.show(error);
			dispatch(clearErrors());
		}
	}, [error, dispatch, alert]);

	const switchTab = (e, tab) => {
		if (tab === "login") {
			switcherTab.current.classList.add("shiftToNeutral");
			switcherTab.current.classList.remove("shiftToRight");

			registerTab.current.classList.remove("shiftToNeutralForm");
			loginTab.current.classList.remove("shiftToLeft");
		}
		if (tab === "register") {
			switcherTab.current.classList.add("shiftToRight");
			switcherTab.current.classList.remove("shiftToNeutral");

			registerTab.current.classList.add("shiftToNeutralForm");
			loginTab.current.classList.add("shiftToLeft");
		}
	};

	return (
		<>
			{loading ? (
				<Loader />
			) : (
				<>
					<MetaData title="Login/Signup" />

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

								<input
									type="submit"
									value="Login"
									disabled={loading ? true : false}
									className="loginBtn"
								/>
							</form>
							<form
								ref={registerTab}
								className="signupForm"
								encType="multipart/form-data"
								onSubmit={registerSubmit}
							>
								<div className="signupName">
									<FaceIcon />
									<input
										type="text"
										placeholder="Name"
										required
										name="name"
										value={name}
										onChange={registerDataChange}
									/>
								</div>
								<div className="signupEmail">
									<MailOutlineIcon />
									<input
										type="email"
										placeholder="Email"
										required
										name="email"
										value={email}
										onChange={registerDataChange}
									/>
								</div>
								<div className="signupPassword">
									<LockOpenIcon />
									<input
										type="password"
										placeholder="Password"
										required
										name="password"
										value={password}
										onChange={registerDataChange}
									/>
								</div>
								<div id="registerImage">
									<img src={avatarPreview} alt="Avatar Preview" />
									<input
										type="file"
										name="avatar"
										accept="image/*"
										onChange={registerDataChange}
									/>
								</div>
								<input
									type="submit"
									value="Register"
									className="signupBtn"
									disabled={loading ? true : false}
								/>
							</form>
						</div>
					</div>
				</>
			)}
		</>
	);
};

export default LoginSignup;
