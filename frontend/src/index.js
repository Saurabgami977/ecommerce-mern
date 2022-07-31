import React from "react";
import ReactDOM from "react-dom/client";

import { ThemeProvider } from "@emotion/react";
import { Provider } from "react-redux";

import store from "./store";
import "./index.css";
import App from "./App";
import theme from "./theme";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<Provider store={store}>
		<ThemeProvider theme={theme}>
			<App />
		</ThemeProvider>
	</Provider>,
);
