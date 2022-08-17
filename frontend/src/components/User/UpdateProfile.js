import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { useNavigate } from "react-router-dom";

import MailOutlineIcon from "@mui/icons-material/MailOutline";
import FaceIcon from "@mui/icons-material/Face";

import "./UpdateProfile.css";
import Loader from "../Layout/Loader/Loader";
import MetaData from "../Layout/MetaData";
import { loadUser } from "../../store/actions/userAction";
import {
	updateProfile,
	clearErrors,
} from "../../store/actions/updateProfileAction";
import { UPDATE_PROFILE_RESET } from "../../store/constants/updateProfileConstant";

const UpdateProfile = () => {
	const dispatch = useDispatch();
	const alert = useAlert();
	const navigate = useNavigate();

	const { user } = useSelector((state) => state.userReducer);
	const { error, isUpdated, loading } = useSelector(
		(state) => state.profileReducer,
	);

	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [avatar, setAvatar] = useState();
	const [avatarPreview, setAvatarPreview] = useState("/Profile.png");

	const updateProfileSubmit = (e) => {
		e.preventDefault();

		const myForm = new FormData();
		myForm.set("name", name);
		myForm.set("email", email);
		myForm.set("avatar", avatar);

		dispatch(updateProfile({ name, email, avatar }));
	};

	const updateProfileDataChange = (e) => {
		const reader = new FileReader();

		reader.onload = () => {
			if (reader.readyState === 2) {
				setAvatarPreview(reader.result);
				setAvatar(reader.result);
			}
		};

		reader.readAsDataURL(e.target.files[0]);
	};

	useEffect(() => {
		if (user) {
			setName(user.name);
			setEmail(user.email);
			setAvatarPreview(user.avatar.url);
		}
		if (error) {
			alert.error(error);
			dispatch(clearErrors());
		}
		if (isUpdated === true) {
			alert.success("Profile updated successfully");
			dispatch(loadUser());
			navigate("/account");
			dispatch({ type: UPDATE_PROFILE_RESET });
		}
	}, [error, alert, dispatch, isUpdated, navigate, user]);

	return (
		<>
			{loading ? (
				<Loader />
			) : (
				<>
					<MetaData title="Update Profile" />
					<div className="updateProfileContainer">
						<div className="updateProfileBox">
							<h2 className="updateProfileHeading">Update Profile</h2>
							<form
								className="updateProfileForm"
								id="updateProfileForm"
								encType="multipart/form-data"
								onSubmit={updateProfileSubmit}
							>
								<div className="updateProfileName">
									<FaceIcon />
									<input
										type="text"
										placeholder="Name"
										required
										name="name"
										value={name}
										onChange={(e) => setName(e.target.value)}
									/>
								</div>
								<div className="updateProfileEmail">
									<MailOutlineIcon />
									<input
										type="email"
										placeholder="Email"
										required
										name="email"
										value={email}
										onChange={(e) => setEmail(e.target.value)}
									/>
								</div>
								<div id="updateProfileImage">
									<img src={avatarPreview} alt="Avatar Preview" />
									<input
										type="file"
										name="avatar"
										accept="image/*"
										onChange={updateProfileDataChange}
									/>
								</div>
								<input
									type="submit"
									value="Update"
									className="updateProfileBtn"
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

export default UpdateProfile;
