import React, { ComponentType } from "react";
import "../styles/globals.css";
import { Provider } from "react-redux";
import store from "../store";
import { AppInitialProps } from "next/app";

function MyApp({
	Component,
	pageProps,
}: {
	Component: ComponentType<AppInitialProps>;
	pageProps: AppInitialProps;
}) {
	return (
		<Provider store={store}>
			<Component {...pageProps} />
		</Provider>
	);
}

export default MyApp;
