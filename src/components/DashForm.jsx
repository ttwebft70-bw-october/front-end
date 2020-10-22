import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Datetime from "react-datetime";
import moment from "moment";
const shortid = require("shortid");

function DashForm(props) {
	const { list, submit } = props;
	const initForm = {
		category: "",
		subcategory: "",
		subList: list.subcategories.map((sub) => sub.subcategory),
		product: "",
		prodList: list.products.map((prod) => prod.product),
		country: "",
		market: "",
		source: "",
		currency: "USD",
		startDate: moment("2015-01-01"),
		endDate: moment("2019-12-31"),
	};
	const [form, setForm] = useState(initForm);

	const handleChange = (e) => {
		function handleCategoriesAndSetForm() {
			let update = { ...form, [name]: value };
			if (name === "product") {
				let checkProd = list.products.find((prod) => prod.product === value);
				if (checkProd && form.category !== "") {
					if (checkProd.category !== form.category) {
						update.category = "";
					}
				}
				if (checkProd && form.subcategory !== "") {
					if (checkProd.subcategory !== form.subcategory) {
						update.subcategory = "";
					}
				}
			} else if (name === "subcategory") {
				if (value !== "") {
					update.prodList = list.products
						.filter((prod) => prod.subcategory === value)
						.map((prod) => prod.product);
				} else {
					if (form.category !== "") {
						update.prodList = list.products
							.filter((prod) => prod.category === form.category)
							.map((prod) => prod.product);
					} else {
						update.prodList = initForm.prodList;
					}
				}
				if (form.category !== "") {
					let checkSub = list.subcategories.find(
						(sub) => sub.subcategory === value
					);
					if (checkSub && checkSub.category !== form.category) {
						update.category = "";
					}
				}
				if (form.product !== "") {
					let checkProd = list.products.find(
						(prod) => prod.product === form.product
					);
					if (checkProd && checkProd.subcategory !== value) {
						update.product = "";
					}
				}
			} else if (name === "category") {
				if (value !== "") {
					update.subList = list.subcategories
						.filter((sub) => sub.category === value)
						.map((sub) => sub.subcategory);
					update.prodList = list.products
						.filter((prod) => prod.category === value)
						.map((prod) => prod.product);
				} else {
					update.subList = initForm.subList;
					update.prodList = initForm.prodList;
				}
				if (form.subcategory !== "") {
					let checkSub = list.subcategories.find(
						(sub) => sub.subcategory === form.subcategory
					);
					if (checkSub && checkSub.category !== value) {
						update.subcategory = "";
					}
				}
				if (form.product !== "") {
					let checkProd = list.products.find(
						(prod) => prod.product === form.product
					);
					if (checkProd && checkProd.category !== value) {
						update.product = "";
					}
				}
			}
			setForm(update);
		}
		const { name, value } = e.target;
		if (name === "category" || name === "subcategory" || name === "product") {
			handleCategoriesAndSetForm();
		} else {
			setForm({
				...form,
				[name]: value,
			});
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		submit({
			category: form.category === "" ? false : form.category,
			subcategory: form.subcategory === "" ? false : form.subcategory,
			product: form.product === "" ? false : form.product,
			country: form.country === "" ? false : form.country,
			market: form.market === "" ? false : form.market,
			source: form.source === "" ? false : form.source,
			currency: form.currency === "" ? false : form.currency,
			start: form.startDate.format("YYYY-MM-DD"),
			end: form.endDate.format("YYYY-MM-DD"),
		});
	};

	const handleStartDateChange = (moment) => {
		setForm({
			...form,
			startDate: moment,
		});
	};
	const handleEndDateChange = (moment) => {
		setForm({
			...form,
			endDate: moment,
		});
	};
	const validateStartDate = (current) => {
		return (
			current.isBefore(form.endDate.clone().add(1, "d")) &&
			current.isBefore(initForm.endDate.clone().add(1, "d")) &&
			current.isAfter(initForm.startDate.clone().subtract(1, "d"))
		);
	};
	const validateEndDate = (current) => {
		return (
			current.isAfter(form.startDate.clone().subtract(1, "d")) &&
			current.isBefore(initForm.endDate.clone().add(1, "d")) &&
			current.isAfter(initForm.startDate.clone().subtract(1, "d"))
		);
	};

	return (
		<Form onSubmit={handleSubmit}>
			<Form.Row>
				<Col>
					<Form.Group controlId="dashProductCategory">
						<Form.Label>Category</Form.Label>
						<Form.Control
							as="select"
							name="category"
							value={form.category}
							onChange={handleChange}
						>
							<option value=""></option>
							{list.categories.map((cat) => (
								<option value={cat} key={shortid.generate()}>{cat}</option>
							))}
						</Form.Control>
					</Form.Group>
				</Col>
				<Col>
					<Form.Group controlId="dashProductSubcategory">
						<Form.Label>Subcategory</Form.Label>
						<Form.Control
							as="select"
							name="subcategory"
							value={form.subcategory}
							onChange={handleChange}
						>
							<option value=""></option>{" "}
							{form.subList.map((sub) => (
								<option value={sub} key={shortid.generate()}>{sub}</option>
							))}
						</Form.Control>
					</Form.Group>
				</Col>
				<Col>
					<Form.Group controlId="dashProduct">
						<Form.Label>Product</Form.Label>
						<Form.Control
							as="select"
							name="product"
							value={form.product}
							onChange={handleChange}
						>
							<option value=""></option>{" "}
							{form.prodList.map((prod) => (
								<option value={prod} key={shortid.generate()}>{prod}</option>
							))}
						</Form.Control>
					</Form.Group>
				</Col>
			</Form.Row>
			<Form.Row>
				<Col>
					<Form.Group controlId="dashCountry">
						<Form.Label>Country</Form.Label>
						<Form.Control
							as="select"
							name="country"
							value={form.country}
							onChange={handleChange}
						>
							<option value=""></option>{" "}
							{list.countries.map((country) => (
								<option value={country.code} key={shortid.generate()}>{country.name}</option>
							))}
						</Form.Control>
					</Form.Group>
				</Col>
				<Col>
					<Form.Group controlId="dashMarket">
						<Form.Label>Market</Form.Label>
						<Form.Control
							as="select"
							name="market"
							value={form.market}
							onChange={handleChange}
						>
							<option value=""></option>{" "}
							{list.markets.map((market) => (
								<option value={market} key={shortid.generate()}>{market}</option>
							))}
						</Form.Control>
					</Form.Group>
				</Col>
			</Form.Row>
			<Form.Row>
				<Col>
					<Form.Group controlId="dashSource">
						<Form.Label>Data source</Form.Label>
						<Form.Control
							as="select"
							name="source"
							value={form.source}
							onChange={handleChange}
						>
							<option value=""></option>{" "}
							{list.sources.map((source) => (
								<option value={source} key={shortid.generate()}>{source}</option>
							))}
						</Form.Control>
					</Form.Group>
				</Col>
				<Col>
					<Form.Group controlId="dashCurrency">
						<Form.Label>Currency conversion</Form.Label>
						<Form.Control
							as="select"
							name="currency"
							value={form.currency}
							onChange={handleChange}
						>
							{list.currencies.map((curr) => (
								<option value={curr} key={shortid.generate()}>{curr}</option>
							))}
						</Form.Control>
					</Form.Group>
				</Col>
			</Form.Row>
			<Form.Row>
				<Col>
					<Form.Group controlId="dashStartDate">
						<Form.Label>Start date</Form.Label>
						<Datetime
							name="startDate"
							value={form.startDate}
							onChange={handleStartDateChange}
							timeFormat={false}
							isValidDate={validateStartDate}
						/>
					</Form.Group>
				</Col>
				<Col>
					<Form.Group controlId="dashEndDate">
						<Form.Label>End date</Form.Label>
						<Datetime
							name="endDate"
							value={form.endDate}
							onChange={handleEndDateChange}
							timeFormat={false}
							isValidDate={validateEndDate}
						/>
					</Form.Group>
				</Col>
			</Form.Row>
			<Form.Row className="justify-content-center dashboard-form-button-row">
				<Button type="submit">Filter Data</Button>
			</Form.Row>
		</Form>
	);
}

export default DashForm;
