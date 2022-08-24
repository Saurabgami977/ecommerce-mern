import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { Country, State } from "country-state-city";

import HomeIcon from "@mui/icons-material/Home";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import PinDropIcon from "@mui/icons-material/PinDrop";
import PhoneIcon from "@mui/icons-material/Phone";
import PublicIcon from "@mui/icons-material/Public";
import TransferWithinAStationIcon from "@mui/icons-material/TransferWithinAStation";

import MetaData from "../Layout/MetaData";
import CheckoutSteps from "./CheckoutSteps.js";
import "./Shipping.css";

const Shipping = () => {
	const dipatch = useDispatch();
	const alert = useAlert();

	const shippingInfo = useSelector((state) => state.cart.shippingInfo);

	const [address, setAddress] = useState();
	const [city, setCity] = useState();
	const [state, setState] = useState();
	const [country, setCountry] = useState();
	const [pinCode, setPinCode] = useState();
	const [phone, setPhone] = useState();

	useEffect(() => {
		if (shippingInfo) {
			setAddress(shippingInfo.address);
			setCity(shippingInfo.city);
			setState(shippingInfo.state);
			setCountry(shippingInfo.country);
			setPinCode(shippingInfo.pinCode);
			setPhone(shippingInfo.phone);
		}
	}, [shippingInfo]);

	const shippingSubmit = () => {};

	return (
		<>
			<MetaData title="Shipping Details" />
			<CheckoutSteps className="checkoutSteps" activeSteps={1} />
			<div className="shippingContainer">
				<div className="shippingBox">
					<h2 className="shippingHeading">Shipping Details</h2>

					<form
						className="shippingForm"
						encType="multipart/form-data"
						onSubmit={shippingSubmit}
					>
						<div>
							<HomeIcon />
							<input
								type="text"
								placeholder="Address"
								required
								value={address}
								onChange={(e) => setAddress(e.target.value)}
							/>
						</div>
						<div>
							<LocationCityIcon />
							<input
								type="text"
								placeholder="City"
								required
								value={city}
								onChange={(e) => setCity(e.target.value)}
							/>
						</div>
						<div>
							<PinDropIcon />
							<input
								type="number"
								placeholder="Pin Code"
								required
								value={pinCode}
								onChange={(e) => setPinCode(e.target.value)}
							/>
						</div>
						<div>
							<PhoneIcon />
							<input
								type="number"
								placeholder="Phone Number"
								required
								value={phone}
								onChange={(e) => setPhone(e.target.value)}
							/>
						</div>
						<div>
							<PublicIcon />
							<select
								required
								value={country}
								onChange={(e) => setCountry(e.target.value)}
							>
								<option value="">Country</option>
								{Country &&
									Country.getAllCountries().map((item) => (
										<option key={item.isoCode} value={item.isoCode}>
											{item.name}
										</option>
									))}
							</select>
						</div>

						{country && (
							<div>
								<TransferWithinAStationIcon />
								<select
									required
									value={state}
									onChange={(e) => setState(e.target.value)}
								>
									<option value="">State</option>
									{State &&
										State.getStatesOfCountry(country).map((item) => (
											<option key={item.isoCode} value={item.isoCode}>
												{item.name}
											</option>
										))}
								</select>
							</div>
						)}
						<input
							type="submit"
							value="Continue"
							className="shippingBtn"
							disabled={state ? false : true}
						/>
					</form>
				</div>
			</div>
		</>
	);
};

export default Shipping;
