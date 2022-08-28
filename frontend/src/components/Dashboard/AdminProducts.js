import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { Link } from "react-router-dom";

import { DataGrid } from "@mui/x-data-grid";
import LaunchIcon from "@mui/icons-material/Launch";

import {
	fetchAdminProducts,
	clearErrors,
} from "../../store/reducers/adminProductsSlice";
import Loader from "../Layout/Loader/Loader";

const AdminProducts = () => {
	const dispatch = useDispatch();
	const alert = useAlert();
	const { adminProducts, loading, error } = useSelector(
		(state) => state.adminProductsReducer,
	);

	const rows = [];
	const columns = [
		{ field: "name", headerName: "Name", flex: 0.5 },
		{
			field: "image",
			headerName: "Image",
			flex: 0.5,
			renderCell: (params) => {
				return (
					<img
						width={150}
						src={params.getValue(params.id, "image")}
						alt="of star"
					/>
				);
			},
		},
		{ field: "id", flex: 0.5, headerName: "Product ID", minWidth: 300 },
		{ field: "ratings", headerName: "Ratings" },
		{ field: "price", headerName: "Price", type: "number" },
		{ field: "stock", headerName: "Stock", type: "number" },
		{
			field: "actions",
			headerName: "Actions",
			type: "number",
			sortable: false,
			renderCell: (params) => {
				return (
					<Link to={`/product/${params.getValue(params.id, "id")}`}>
						<LaunchIcon />
					</Link>
				);
			},
		},
	];

	adminProducts.length > 0 &&
		adminProducts.forEach((item, index) =>
			rows.push({
				name: item.name,
				id: item._id,
				ratings: item.ratings,
				price: item.price,
				stock: item.stock,
				image: item.images[0].url,
			}),
		);
	useEffect(() => {
		dispatch(fetchAdminProducts());
	}, [dispatch]);

	useEffect(() => {
		if (error) {
			alert.show(error);
			dispatch(clearErrors());
		}
	}, [dispatch, error, alert]);

	return (
		<div className="dashboardBody">
			{loading ? (
				<Loader />
			) : (
				<DataGrid
					rows={rows}
					columns={columns}
					pageSize={10}
					rowsPerPageOptions={[5]}
					disableSelectionOnClick
					rowHeight={150}
					// className="myOrdersTable"
					autoHeight
				/>
			)}
		</div>
	);
};

export default AdminProducts;
