import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";

import MailOutlineIcon from "@mui/icons-material/MailOutline";

import "./css/ForgotPassword.css";
import {
	clearErrors,
	forgotPassword,
} from "../../store/actions/updateProfileAction";
import Loader from "../Layout/Loader/Loader";
import MetaData from "../Layout/MetaData";

const ForgotPassword = () => {
	const dispatch = useDispatch();
	const alert = useAlert();

	const [email, setEmail] = useState("");

	const { error, loading, message, success } = useSelector(
		(state) => state.forgotPasswordReducer,
	);

	const resetPassword = (e) => {
		e.preventDefault();
		dispatch(forgotPassword({ email: email }));
		setEmail("");
	};

	useEffect(() => {
		if (success) {
			alert.info(message);
		}
		if (error) {
			alert.info(error);
			dispatch(clearErrors());
		}
	}, [error, success, message, alert, dispatch]);

	return (
		<>
			{loading ? (
				<Loader />
			) : (
				<>
					<MetaData title="Forgot Password " />
					<div className="resetPasswordContainer">
						<div className="resetPasswordBox">
							<h2 className="forogtPasswordHeading">Forgot Password</h2>

							<form className="resetPasswordForm" onSubmit={resetPassword}>
								<div className="resetPasswordEmail">
									<MailOutlineIcon />
									<input
										type="email"
										placeholder="Email"
										required
										value={email}
										onChange={(e) => setEmail(e.target.value)}
									/>
								</div>

								<Link to="/login">Remember password? Login Here </Link>

								<input
									type="submit"
									value="Send Password Reset Link"
									disabled={loading ? true : false}
									className="resetPasswordBtn"
								/>
							</form>
						</div>
					</div>
				</>
			)}
		</>
	);
};

export default ForgotPassword;
