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
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

const pages = [
	{ name: "Home", to: "/" },
	{ name: "Products", to: "/products" },
	{ name: "About", to: "/about" },
	{ name: "Contact", to: "/contact" },
];
const settings = [
	{ name: "Profile", to: "/login" },
	{ name: "Account", to: "/account" },
	{ name: "Dashboard", to: "/dashboard" },
	{ name: "Logout", to: "/logout" },
];

const Header = () => {
	const dispatch = useDispatch();

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
							component="a"
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
							component="a"
							href=""
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
					<Box sx={{ flexGrow: 0 }}>
						<Tooltip title="Open settings">
							<IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
								<Avatar alt="Saurav" src="/static/images/avatar/2.jpg" />
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
							{settings.map((setting) => (
								<MenuItem key={setting} onClick={handleCloseUserMenu}>
									<Link
										to={setting.to}
										style={{ textDecoration: "none", color: "black" }}
									>
										<Typography textAlign="center">{setting.name}</Typography>
									</Link>
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
