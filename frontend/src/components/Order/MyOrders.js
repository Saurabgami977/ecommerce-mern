import * as React from "react";

import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";

import { Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import LaunchIcon from "@mui/icons-material/Launch";

import { clearErrors, myOrders } from "../../store/actions/orderAction";
import Loader from "../Layout/Loader/Loader";
import MetaData from "../Layout/MetaData";
import "./css/MyOrders.css";
import { useEffect } from "react";

const MyOrders = () => {
	const dispatch = useDispatch();
	const alert = useAlert();

	const { loading, error, orders } = useSelector(
		(state) => state.myOrdersReducer,
	);
	const { user } = useSelector((state) => state.userReducer);

	const rows = [];
	const columns = [
		{ field: "id", headerName: "Order ID", minWidth: 300, flex: 1 },
		{
			field: "status",
			headerName: "Status",
			minWidth: 150,
			flex: 0.5,
			cellClassName: (params) => {
				return params.getValue(params.id, "status") === "Delivered"
					? "greenText"
					: "redText";
			},
		},
		{
			field: "itemQty",
			headerName: "Items Qty",
			type: "number",
			minWidth: 150,
			flex: 0.3,
		},
		{
			field: "amount",
			headerName: "Amount",
			type: "number",
			minWidth: 270,
			flex: 0.5,
		},
		{
			field: "actions",
			headerName: "Actions",
			minWidth: 150,
			type: "number",
			flex: 0.3,
			sortable: false,
			renderCell: (params) => {
				return (
					<Link to={`/order/${params.getValue(params.id, "id")}`}>
						<LaunchIcon />
					</Link>
				);
			},
		},
	];

	orders &&
		orders.forEach((item, index) =>
			rows.push({
				id: item._id,
				status: item.orderStatus,
				itemQty: item.orderItems.length,
				amount: `$ ${item.totalPrice}`,
			}),
		);

	useEffect(() => {
		if (error) {
			alert.show(error);
			dispatch(clearErrors());
		}
	}, [error, alert, dispatch]);
	useEffect(() => {
		dispatch(myOrders());
	}, [dispatch]);

	return (
		<>
			<MetaData title={`${user.name}'s - Orders`} />
			{loading ? (
				<Loader />
			) : (
				<div className="myOrdersPage">
					{orders.length >= 1 ? (
						<>
							<DataGrid
								rows={rows}
								columns={columns}
								pageSize={12}
								rowsPerPageOptions={[10]}
								disableSelectionOnClick
								className="myOrdersTable"
								autoHeight
							/>
							<Typography id="myOrdersHeading">{user.name}'s Orders</Typography>
						</>
					) : (
						<Typography>
							No Order To Show.{" "}
							<Link
								to="/products"
								style={{
									backgroundColor: "green",
									padding: "5px 13px",
									color: "white",
									textDecoration: "none",
									borderRadius: "7px",
								}}
							>
								Place a Order
							</Link>{" "}
						</Typography>
					)}
				</div>
			)}
		</>
	);
};

export default MyOrders;
