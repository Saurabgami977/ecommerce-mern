import React from "react";
import ReactDOM from "react-dom/client";

import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider } from "@emotion/react";
import { Provider } from "react-redux";
import { positions, transitions, Provider as AlertProvider } from "react-alert";
import AlertMUITemplate from "react-alert-template-mui";

import store from "./store";
import App from "./App";
import theme from "./theme";

const options = {
	timeout: 5000,
	position: positions.BOTTOM_CENTER,
	transition: transitions.SCALE,
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<Router>
		<Provider store={store}>
			<ThemeProvider theme={theme}>
				<AlertProvider template={AlertMUITemplate} {...options}>
					<App />
				</AlertProvider>
			</ThemeProvider>
		</Provider>
	</Router>,
);
