import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { Link, useNavigate, useParams } from "react-router-dom";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import Lock from "@mui/icons-material/Lock";

import Loader from "../Layout/Loader/Loader";
import MetaData from "../Layout/MetaData";
import {
	resetPassword,
	clearErrors,
} from "../../store/actions/updateProfileAction";
import { UPDATE_PASSWORD_RESET } from "../../store/constants/updateProfileConstant";
import "./css/ResetPassword.css";

const ResetPassword = () => {
	const dispatch = useDispatch();
	const { token } = useParams();
	const alert = useAlert();
	const navigate = useNavigate();

	const { error, success, loading } = useSelector(
		(state) => state.forgotPasswordReducer,
	);
	console.log(token);
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	const resetPasswordSubmit = (e) => {
		e.preventDefault();

		dispatch(resetPassword(token, password, confirmPassword));
	};

	useEffect(() => {
		if (error) {
			alert.error(error);
			dispatch(clearErrors());
		}
		if (success === true) {
			alert.success("Password changed successfully");
			navigate("/login");
		}
	}, [error, alert, dispatch, success, navigate]);

	return (
		<>
			{loading ? (
				<Loader />
			) : (
				<>
					<MetaData title="Change Password" />
					<div className="resetPasswordContainer">
						<div className="resetPasswordBox">
							<h2 className="resetPasswordHeading">Reset Password</h2>
							<form
								className="resetPasswordForm"
								id="resetPasswordForm"
								onSubmit={resetPasswordSubmit}
							>
								<div className="loginPassword">
									<LockOpenIcon />
									<input
										type="password"
										placeholder="New Password"
										required
										value={password}
										onChange={(e) => setPassword(e.target.value)}
									/>
								</div>
								<div className="loginPassword">
									<Lock />
									<input
										type="password"
										placeholder="Confirm New Password"
										required
										value={confirmPassword}
										onChange={(e) => setConfirmPassword(e.target.value)}
									/>
								</div>
								<Link to="/password/forgot">Forget Password </Link>
								<input
									type="submit"
									value="Change"
									className="resetPasswordBtn"
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

export default ResetPassword;
