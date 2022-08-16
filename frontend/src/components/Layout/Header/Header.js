import React, { useState } from "react";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import SearchIcon from "@mui/icons-material/Search";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { logoutUser } from "../../../store/actions/userAction";

const pages = [
	{ name: "Home", to: "/" },
	{ name: "Products", to: "/products" },
	{ name: "About", to: "/about" },
	{ name: "Contact", to: "/contact" },
];

const Header = () => {
	const dispatch = useDispatch();
	const alert = useAlert();
	const navigate = useNavigate();

	const { isAuthenticated, user } = useSelector((state) => state.userReducer);

	const [anchorElNav, setAnchorElNav] = useState(null);
	const [anchorElUser, setAnchorElUser] = useState(null);

	const handleOpenNavMenu = (event) => {
		setAnchorElNav(event.currentTarget);
	};
	const handleOpenUserMenu = (event) => {
		setAnchorElUser(event.currentTarget);
	};

	const handleCloseNavMenu = () => {
		setAnchorElNav(null);
	};

	const handleCloseUserMenu = () => {
		setAnchorElUser(null);
	};

	const handleSearchModal = () => {
		dispatch({ type: "CHANGE_SEARCH_MODAL_STATUS", payload: true });
	};

	const loginUser = () => {
		navigate("/login");
	};
	const account = () => {
		navigate("/account");
	};
	const orders = () => {
		navigate("/orders");
	};
	const logout = () => {
		dispatch(logoutUser());
		alert.success("Logged out successfully");
	};

	const settings = [{ name: "Login", to: "/login", func: loginUser }];

	const LoggedInUserSettings = [
		{ name: "Profile", to: "/account", func: account },
		{ name: "Orders", to: "/orders", func: orders },
		{ name: "Logout", to: "/logout", func: logout },
	];

	if (user?.role === "admin") {
		LoggedInUserSettings.unshift({ name: "Dashboard", to: "/dashboard" });
	}

	return (
		<AppBar position="fixed" color="primary">
			<Container maxWidth="xl">
				<Toolbar disableGutters>
					<ShoppingBasketIcon
						sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
					/>
					<Link to="/" style={{ textDecoration: "none" }}>
						<Typography
							variant="h6"
							noWrap
							sx={{
								mr: 2,
								display: { xs: "none", md: "flex" },
								fontFamily: "monospace",
								fontWeight: 700,
								letterSpacing: ".3rem",
								color: "white",
							}}
						>
							Saurav Store
						</Typography>
					</Link>
					<Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
						<IconButton
							size="large"
							aria-label="account of current user"
							aria-controls="menu-appbar"
							aria-haspopup="true"
							onClick={handleOpenNavMenu}
							color="inherit"
						>
							<MenuIcon />
						</IconButton>
						<Menu
							id="menu-appbar"
							anchorEl={anchorElNav}
							anchorOrigin={{
								vertical: "bottom",
								horizontal: "left",
							}}
							keepMounted
							transformOrigin={{
								vertical: "top",
								horizontal: "left",
							}}
							open={Boolean(anchorElNav)}
							onClose={handleCloseNavMenu}
							sx={{
								display: { xs: "block", md: "none" },
							}}
						>
							{pages.map((page, index) => (
								<MenuItem key={index} onClick={handleCloseNavMenu}>
									<Link
										to={page.to}
										style={{ textDecoration: "none", color: "black" }}
									>
										<Typography textAlign="center">{page.name}</Typography>
									</Link>
								</MenuItem>
							))}
						</Menu>
					</Box>
					<ShoppingBasketIcon
						sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}
					/>
					<Link to="/" style={{ textDecoration: "none" }}>
						<Typography
							variant="h5"
							noWrap
							sx={{
								mr: 2,
								display: { xs: "flex", md: "none" },
								flexGrow: 1,
								fontFamily: "monospace",
								fontWeight: 700,
								letterSpacing: ".3rem",
								color: "white",
								textDecoration: "none",
							}}
						>
							Saurav Store
						</Typography>
					</Link>
					<Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
						{pages.map((page, index) => (
							<Button
								key={index}
								onClick={handleCloseNavMenu}
								sx={{ my: 2, color: "white", display: "block" }}
							>
								<Link
									style={{ textDecoration: "none", color: "white" }}
									to={page.to}
								>
									{page.name}
								</Link>
							</Button>
						))}
					</Box>
					<Link to="/search" style={{ textDecoration: "none", color: "white" }}>
						<Button color="secondary" onClick={() => handleSearchModal()}>
							Search
							<SearchIcon
								sx={{ marginRight: "20px", marginLeft: "20px", color: "white" }}
							/>
						</Button>
					</Link>
					{/* {console.log(user?.avatar?.url)} */}
					<Box sx={{ flexGrow: 0 }}>
						<Tooltip title="Open settings">
							<IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
								<Avatar
									alt="Saurav"
									src={user?.avatar?.url || "/static/images/avatar/2.jpg"}
								/>
							</IconButton>
						</Tooltip>
						<Menu
							sx={{ mt: "45px" }}
							id="menu-appbar"
							anchorEl={anchorElUser}
							anchorOrigin={{
								vertical: "top",
								horizontal: "right",
							}}
							keepMounted
							transformOrigin={{
								vertical: "top",
								horizontal: "right",
							}}
							open={Boolean(anchorElUser)}
							onClose={handleCloseUserMenu}
						>
							{isAuthenticated
								? LoggedInUserSettings.map((setting, index) => (
										<MenuItem key={index} onClick={handleCloseUserMenu}>
											<Link
												to={setting.to}
												style={{ textDecoration: "none", color: "black" }}
												onClick={setting.func}
											>
												<Typography textAlign="center">
													{setting.name}
												</Typography>
											</Link>
										</MenuItem>
								  ))
								: settings.map((setting, index) => (
										<MenuItem key={index} onClick={handleCloseUserMenu}>
											<Typography textAlign="center" onClick={setting.func}>
												{setting.name}
											</Typography>
										</MenuItem>
								  ))}
						</Menu>
					</Box>
				</Toolbar>
			</Container>
		</AppBar>
	);
};
export default Header;
