import * as React from "react";

import { Link, useNavigate } from "react-router-dom";

import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import CategoryIcon from "@mui/icons-material/Category";
import PeopleIcon from "@mui/icons-material/People";
import LogoutIcon from "@mui/icons-material/Logout";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../store/actions/userAction";
import HomeIcon from "@mui/icons-material/Home";

const drawerWidth = 200;

function Sidebar(props) {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const { window } = props;
	const [mobileOpen, setMobileOpen] = React.useState(false);

	const handleDrawerToggle = () => {
		setMobileOpen(!mobileOpen);
	};

	const logout = () => {
		dispatch(logoutUser());
		navigate("/login");
	};

	const dashboardNavigation = [
		{ name: "Dashboard", to: "/admin/dashboard", icon: <DashboardIcon /> },
		{ name: "Orders", to: "/admin/orders", icon: <AddShoppingCartIcon /> },
		{ name: "Products", to: "/admin/products", icon: <CategoryIcon /> },
		{ name: "Users", to: "/admin/users", icon: <PeopleIcon /> },
		{ name: "Logout", to: "/login", icon: <LogoutIcon /> },
		{ name: "Visit site", to: "/", icon: <HomeIcon /> },
	];

	const drawer = (
		<div style={{ backgroundColor: "black", height: "100vh" }}>
			<Toolbar />
			<Divider />
			<List>
				{dashboardNavigation.map((item, index) => (
					<Link
						onClick={() => item.name === "Logout" && logout()}
						key={index}
						to={item.to}
						style={{
							textDecoration: "none",
							color: "white",
							position: item.name === "Logout" && "fixed",
							bottom: item.name === "Logout" && "0",
						}}
					>
						<ListItem disablePadding>
							<ListItemButton>
								<ListItemIcon
									style={{ color: item.name === "Logout" ? "red" : "white" }}
								>
									{item.icon}
								</ListItemIcon>
								<ListItemText
									style={{
										color: item.name === "Logout" ? "red" : "white",
										"& :hover": {
											color: "red",
										},
									}}
									primary={item.name}
								/>
							</ListItemButton>
						</ListItem>
					</Link>
				))}
			</List>
		</div>
	);

	const container =
		window !== undefined ? () => window().document.body : undefined;

	return (
		<Box sx={{ display: "flex" }}>
			<CssBaseline />
			<AppBar
				position="sticky"
				sx={{
					// width: { sm: `calc(100% - ${drawerWidth}px)` },
					display: { sm: `none` },
					ml: { sm: `${drawerWidth}px` },
				}}
			>
				<Toolbar>
					<IconButton
						color="inherit"
						aria-label="open drawer"
						edge="start"
						onClick={handleDrawerToggle}
						sx={{ mr: 2, display: { sm: "none" } }}
					>
						<MenuIcon />
					</IconButton>
					<Typography variant="h6" noWrap component="div">
						Saurav Store's Admin Dashboard
					</Typography>
				</Toolbar>
			</AppBar>

			<Box
				component="nav"
				sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
				aria-label="mailbox folders"
			>
				{/* The implementation can be swapped with js to avoid SEO duplication of links. */}
				<Drawer
					container={container}
					variant="temporary"
					open={mobileOpen}
					onClose={handleDrawerToggle}
					ModalProps={{
						keepMounted: true, // Better open performance on mobile.
					}}
					sx={{
						display: { xs: "block", sm: "none" },
						"& .MuiDrawer-paper": {
							boxSizing: "border-box",
							width: drawerWidth,
						},
					}}
				>
					{drawer}
				</Drawer>
				<Drawer
					variant="permanent"
					sx={{
						display: { xs: "none", sm: "block" },
						"& .MuiDrawer-paper": {
							boxSizing: "border-box",
							width: drawerWidth,
						},
					}}
					open
				>
					{drawer}
				</Drawer>
			</Box>
		</Box>
	);
}

Sidebar.propTypes = {
	/**
	 * Injected by the documentation to work in an iframe.
	 * You won't need it on your project.
	 */
	window: PropTypes.func,
};

export default Sidebar;
