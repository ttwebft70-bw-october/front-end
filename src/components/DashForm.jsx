import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

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
		});
	};

	useEffect(() => {
		console.log(form);
	}, [form]);

	return (
		<Form onSubmit={handleSubmit}>
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
						<option value={cat}>{cat}</option>
					))}
				</Form.Control>
			</Form.Group>
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
						<option value={sub}>{sub}</option>
					))}
				</Form.Control>
			</Form.Group>
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
						<option value={prod}>{prod}</option>
					))}
				</Form.Control>
			</Form.Group>
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
						<option value={country.code}>{country.name}</option>
					))}
				</Form.Control>
			</Form.Group>
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
						<option value={market}>{market}</option>
					))}
				</Form.Control>
			</Form.Group>
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
						<option value={source}>{source}</option>
					))}
				</Form.Control>
			</Form.Group>
			<Form.Group controlId="dashCurrency">
				<Form.Label>Currency conversion</Form.Label>
				<Form.Control
					as="select"
					name="currency"
					value={form.currency}
					onChange={handleChange}
				>
					{list.currencies.map((curr) => (
						<option value={curr}>{curr}</option>
					))}
				</Form.Control>
			</Form.Group>
			<Button type="submit">Filter</Button>
		</Form>
	);
}

export default DashForm;
