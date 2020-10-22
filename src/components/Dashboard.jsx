import React, { useState, useEffect } from "react";
import axios from "axios";
import Container from "react-bootstrap/Container";

import DashForm from "./DashForm";
import DashTable from "./DashTable";

import {
	SAUTI_PRODUCT_CATEGORIES,
	SAUTI_PRODUCT_SUBCATEGORIES,
	SAUTI_PRODUCTS,
	SAUTI_COUNTRIES,
	SAUTI_SOURCES,
	SAUTI_MARKETS,
	SAUTI_CURRENCIES,
} from "../modules/sautidata.js";

export default function Dashboard(props) {
	const [sauti, setSauti] = useState({
		list: {
			categories: SAUTI_PRODUCT_CATEGORIES,
			subcategories: SAUTI_PRODUCT_SUBCATEGORIES,
			products: SAUTI_PRODUCTS,
			countries: SAUTI_COUNTRIES,
			sources: SAUTI_SOURCES,
			markets: SAUTI_MARKETS,
			currencies: SAUTI_CURRENCIES,
		},
		data: [],
	});

	const sautiAPI = axios.create({
		baseURL: "https://market-price-api.herokuapp.com/sauti/developer/filter/",
		headers: { key: process.env.REACT_APP_SAUTI_API_KEY },
	});

	const getInitialData = () => {
		sautiAPI
			.get("?currency=USD")
			.then((res) => {
				setSauti({
					...sauti,
					data: res.data.records,
				});
			})
			.catch((err) => {
				console.error(err);
			});
	};

	useEffect(getInitialData, []);

	const submit = (filters) => {
		let url = `?`;
		if (filters.product) {
			url = url.concat(`p=${filters.product}&`);
		} else if (filters.subcategory) {
			url = url.concat(`pagg=${filters.subcategory}&`);
		} else if (filters.category) {
			url = url.concat(`pcat=${filters.category}&`);
		}
		if (filters.country) {
			url = url.concat(`c=${filters.country}&`);
		}
		if (filters.market) {
			url = url.concat(`m=${filters.market}&`);
		}
		if (filters.source) {
			url = url.concat(`source=${filters.source}&`);
		}
		url = url.concat(`currency=${filters.currency}`);
		sautiAPI
			.get(url)
			.then((res) => {
				setSauti({
					...sauti,
					data: res.data.records,
				});
			})
			.catch((err) => {
				console.error(err);
			});
	};

	return (
		<Container>
			<DashForm list={sauti.list} submit={submit} />
			<DashTable data={sauti.data} countries={sauti.list.countries} />
		</Container>
	);
}
