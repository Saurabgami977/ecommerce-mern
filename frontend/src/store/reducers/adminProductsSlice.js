import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { getAllAdminProducts } from "../../axios";

// First, create the thunk
export const fetchAdminProducts = createAsyncThunk(
	"admin/fetchAllAdminProducts",
	async (args, { rejectWithValue }) => {
		try {
			const { data } = await getAllAdminProducts();
			return data.products;
		} catch (err) {
			return rejectWithValue(err.response.data.message);
		}
	},
);

const initialState = {
	loading: false,
	adminProducts: [],
	error: null,
};

export const adminProductsSlice = createSlice({
	name: "adminProducts",
	initialState,
	reducers: {
		clearErrors: (state) => {
			state.error = null;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchAdminProducts.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(fetchAdminProducts.fulfilled, (state, action) => {
			state.loading = false;
			state.adminProducts = action.payload;
			state.error = null;
		});
		builder.addCase(fetchAdminProducts.rejected, (state, action) => {
			state.loading = false;
			state.adminProducts = [];
			state.error = action.payload;
		});
	},
});

export const { clearErrors } = adminProductsSlice.actions;

export default adminProductsSlice.reducer;
