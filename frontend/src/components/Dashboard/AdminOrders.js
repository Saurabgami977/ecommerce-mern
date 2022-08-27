import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";

import { DataGrid } from "@mui/x-data-grid";
import LaunchIcon from "@mui/icons-material/Launch";

import { adminOrdersAction } from "../../store/actions/adminOrdersAction";
import Loader from "../Layout/Loader/Loader";
import MetaData from "../Layout/MetaData";
import { CLEAR_ERRORS } from "../../store/constants/adminOrderConstant";

const AdminOrders = () => {
	const dispatch = useDispatch();
	const alert = useAlert();
	const { orders, loading, error } = useSelector(
		(state) => state.adminOrdersReducer,
	);

	const rows = [];
	const columns = [
		{ field: "id", headerName: "Order ID", minWidth: 300, flex: 1 },
		{ field: "createdAt", headerName: "Created At" },
		{
			field: "status",
			headerName: "Status",
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
		},
		{
			field: "amount",
			headerName: "Amount",
			type: "number",
		},
		{
			field: "paymentStatus",
			headerName: "Payment",
			cellClassName: (params) => {
				return params.getValue(params.id, "paymentStatus") === "succeeded"
					? "greenText"
					: "redText";
			},
		},
		{
			field: "actions",
			headerName: "Actions",
			type: "number",
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
				paymentStatus: `${item.paymentInfo.status}`,
				createdAt: item.createdAt.slice(0, 10),
			}),
		);

	useEffect(() => {
		dispatch(adminOrdersAction());
		if (error) {
			alert(error);
			dispatch(CLEAR_ERRORS);
		}
	}, [dispatch, error, alert]);
	return (
		<>
			{loading ? (
				<Loader />
			) : (
				<>
					<MetaData title="Orders List - Admin Dashboard" />
					<div className="dashboardBody">
						<DataGrid
							rows={rows}
							columns={columns}
							pageSize={10}
							rowsPerPageOptions={[5]}
							disableSelectionOnClick
							// className="myOrdersTable"
							autoHeight
						/>
					</div>
				</>
			)}
		</>
	);
};

export default AdminOrders;
