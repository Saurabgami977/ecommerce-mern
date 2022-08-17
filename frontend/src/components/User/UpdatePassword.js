import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { Link, useNavigate } from "react-router-dom";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import Lock from "@mui/icons-material/Lock";
import VpnKeyIcon from "@mui/icons-material/VpnKey";

import Loader from "../Layout/Loader/Loader";
import MetaData from "../Layout/MetaData";
import {
	updatePassword,
	clearErrors,
} from "../../store/actions/updateProfileAction";
import { UPDATE_PASSWORD_RESET } from "../../store/constants/updateProfileConstant";
import "./UpdatePassword.css";

const UpdatePassword = () => {
	const dispatch = useDispatch();
	const alert = useAlert();
	const navigate = useNavigate();

	const { error, isUpdated, loading } = useSelector(
		(state) => state.profileReducer,
	);

	const [oldPassword, setOldPassword] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	const updatePasswordSubmit = (e) => {
		e.preventDefault();

		dispatch(updatePassword({ oldPassword, newPassword, confirmPassword }));
	};

	useEffect(() => {
		if (error) {
			alert.error(error);
			dispatch(clearErrors());
		}
		if (isUpdated === true) {
			alert.success("Password updated successfully");
			navigate("/account");
			dispatch({ type: UPDATE_PASSWORD_RESET });
		}
	}, [error, alert, dispatch, isUpdated, navigate]);

	return (
		<>
			{loading ? (
				<Loader />
			) : (
				<>
					<MetaData title="Change Password" />
					<div className="updatePasswordContainer">
						<div className="updatePasswordBox">
							<h2 className="updatePasswordHeading">Update Profile</h2>
							<form
								className="updatePasswordForm"
								id="updatePasswordForm"
								encType="multipart/form-data"
								onSubmit={updatePasswordSubmit}
							>
								<div className="loginPassword">
									<VpnKeyIcon />
									<input
										type="password"
										placeholder="Old Password"
										required
										value={oldPassword}
										onChange={(e) => setOldPassword(e.target.value)}
									/>
								</div>
								<div className="loginPassword">
									<LockOpenIcon />
									<input
										type="password"
										placeholder="New Password"
										required
										value={newPassword}
										onChange={(e) => setNewPassword(e.target.value)}
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
									className="updatePasswordBtn"
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

export default UpdatePassword;
