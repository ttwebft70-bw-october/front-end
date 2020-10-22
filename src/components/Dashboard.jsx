import React, { useState, useEffect } from "react";
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
	const [query, setQuery] = useState("?currency=USD");

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

		if (filters.start) {
			url = url.concat(`startDate=${filters.start}&`);
		}
		if (filters.end) {
			url = url.concat(`endDate=${filters.end}&`);
		}

		url = url.concat(`currency=${filters.currency}`);
		setQuery(url);
	};

	return (
		<Container className="dashboard-container">
			<DashForm list={sauti.list} submit={submit} />
			<DashTable countries={sauti.list.countries} baseQuery={query} />
		</Container>
	);
}
