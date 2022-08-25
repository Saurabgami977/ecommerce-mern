import React, { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { Typography } from "@mui/material";
import { useAlert } from "react-alert";

import { getOrderDetails, clearErrors } from "../../store/actions/orderAction";
import Loader from "../Layout/Loader/Loader";
import MetaData from "../Layout/MetaData";

import "./css/OrderDetails.css";

const OrderDetails = () => {
	const dispatch = useDispatch();
	const alert = useAlert();
	const { id } = useParams();

	const { order, error, loading } = useSelector(
		(state) => state.orderDetailsReducer,
	);

	useEffect(() => {
		if (error) {
			alert.show(error);
			return dispatch(clearErrors());
		}

		dispatch(getOrderDetails(id));
	}, [dispatch, alert, error, id]);

	return (
		<>
			{loading ? (
				<Loader />
			) : (
				<div className="orderDetailContainer">
					<h1>{order?.orderItems && order.orderItems[0].name}</h1>
					<h1>{order?.orderItems && order.orderItems[0].name}</h1>
					<h1>{order?.orderItems && order.orderItems[0].name}</h1>
					<h1>{order?.orderItems && order.orderItems[0].name}</h1>
					<h1>{order?.orderItems && order.orderItems[0].name}</h1>
					<h1>{order?.orderItems && order.orderItems[0].name}</h1>
					<h1>{order?.orderItems && order.orderItems[0].name}</h1>
					<h1>{order?.orderItems && order.orderItems[0].name}</h1>
					<h1>{order?.orderItems && order.orderItems[0].name}</h1>
					<h1>{order?.orderItems && order.orderItems[0].name}</h1>
					<h1>{order?.orderItems && order.orderItems[0].name}</h1>
					<h1>{order?.orderItems && order.orderItems[0].name}</h1>
					<h1>{order?.orderItems && order.orderItems[0].name}</h1>
					<h1>{order?.orderItems && order.orderItems[0].name}</h1>
					<h1>{order?.orderItems && order.orderItems[0].name}</h1>
					<h1>{order?.orderItems && order.orderItems[0].name}</h1>
					<h1>{order?.orderItems && order.orderItems[0].name}</h1>
					<h1>{order?.orderItems && order.orderItems[0].name}</h1>
					<h1>{order?.orderItems && order.orderItems[0].name}</h1>
				</div>
			)}
		</>
	);
};

export default OrderDetails;
