import React, { useState, useEffect } from "react";
import axios from "axios";
import Container from "react-bootstrap/Container";
import DashboardForm from "./DashboardForm";
import {
	SAUTI_PRODUCT_CATEGORIES,
	SAUTI_PRODUCT_SUBCATEGORIES,
	SAUTI_PRODUCTS,
} from "../modules/sauti-categories.js";
import DashboardDisplay from "./DashboardDisplay";

export default function Dashboard(props) {
	const { sauti, setSauti } = props;
	const [dash, setDash] = useState({
		initalized: false,
		data: false,
	});

	const sautiAxios = axios.create({
		baseURL: "https://market-price-api.herokuapp.com/sauti/developer/",
		headers: { key: process.env.REACT_APP_SAUTI_API_KEY },
	});

	const formSubmit = (product) => {
		sautiAxios
			.get(`product/latestprice/?product=${product}`)
			.then((res) => {
				setDash({ ...dash, data: res.data.records });
			})
			.catch((err) => {
				console.error(err);
			});
	};

	useEffect(() => {
		if (!dash.initialized) {
			let parsed = { list: [] };

			SAUTI_PRODUCT_CATEGORIES.forEach((cat) => {
				parsed.list.push(cat);
				parsed[cat] = { list: [] };
			});
			SAUTI_PRODUCT_SUBCATEGORIES.forEach((sub) => {
				parsed[sub.category].list.push(sub.subcategory);
				parsed[sub.category][sub.subcategory] = { list: [] };
			});
			SAUTI_PRODUCTS.forEach((prod) => {
				parsed[prod.category][prod.subcategory].list.push(prod.product);
			});

			let init = { category: parsed };

			setSauti(init);
			setDash({ ...dash, initalized: true });
		}
	}, []);

	return (
		<Container>
			<h1>Dashboard</h1>
			{dash.initalized ? (
				<DashboardForm sauti={sauti} submit={formSubmit} />
			) : (
				""
			)}
			{dash.data ? <DashboardDisplay data={dash.data} /> : ""}
		</Container>
	);
}
