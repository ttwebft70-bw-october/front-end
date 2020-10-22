import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
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
		startYear: "",
		startMonth: "",
		startDayOn: false,
		startDayOptions: [],
		startDay: "",
		endYear: "",
		endMonth: "",
		endDayOn: false,
		endDayOptions: [],
		endDay: "",
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
		function handleDatesAndSetForm() {
			let update = { ...form, [name]: value };
			if (
				name === "startYear" ||
				name === "startMonth" ||
				name === "startDay"
			) {
				if (update.startMonth !== "") {
					update.startDayOn = true;
					update.startDayOptions = [];
					let days = 0;
					if (
						update.startMonth === "01" ||
						update.startMonth === "03" ||
						update.startMonth === "05" ||
						update.startMonth === "07" ||
						update.startMonth === "08" ||
						update.startMonth === "10" ||
						update.startMonth === "12"
					) {
						days = 31;
					} else if (
						update.startMonth === "04" ||
						update.startMonth === "06" ||
						update.startMonth === "09" ||
						update.startMonth === "11"
					) {
						days = 30;
					} else if (update.startMonth === "02") {
						if (Number.parseInt(update.startYear) % 4 === 0) {
							days = 29;
						} else {
							days = 28;
						}
					}
					for (let i = 1; i <= days; i++) {
						if (i < 10) {
							update.startDayOptions.push(`0${i}`);
						} else {
							update.startDayOptions.push(`${i}`);
						}
					}
				} else {
					update.startDayOn = false;
				}
			}
			if (name === "endYear" || name === "endMonth" || name === "endDay") {
				if (update.endMonth !== "") {
					update.endDayOn = true;
					update.endDayOptions = [];
					let days = 0;
					if (
						update.endMonth === "01" ||
						update.endMonth === "03" ||
						update.endMonth === "05" ||
						update.endMonth === "07" ||
						update.endMonth === "08" ||
						update.endMonth === "10" ||
						update.endMonth === "12"
					) {
						days = 31;
					} else if (
						update.endMonth === "04" ||
						update.endMonth === "06" ||
						update.endMonth === "09" ||
						update.endMonth === "11"
					) {
						days = 30;
					} else if (update.endMonth === "02") {
						if (Number.parseInt(update.endYear) % 4 === 0) {
							days = 29;
						} else {
							days = 28;
						}
					}
					for (let i = 1; i <= days; i++) {
						if (i < 10) {
							update.endDayOptions.push(`0${i}`);
						} else {
							update.endDayOptions.push(`${i}`);
						}
					}
				} else {
					update.endDayOn = false;
				}
			}
			setForm(update);
		}
		const { name, value } = e.target;
		if (name === "category" || name === "subcategory" || name === "product") {
			handleCategoriesAndSetForm();
		} else if (
			name === "startYear" ||
			name === "startMonth" ||
			name === "startDay" ||
			name === "endYear" ||
			name === "endMonth" ||
			name === "endDay"
		) {
			handleDatesAndSetForm();
		} else {
			setForm({
				...form,
				[name]: value,
			});
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		let startDate = false;
		let endDate = false;
		if (
			form.startYear !== "" &&
			form.startMonth !== "" &&
			form.startDay !== ""
		) {
			startDate = `${form.startYear}-${form.startMonth}-${form.startDay}`;
		}
		if (form.endYear !== "" && form.endMonth !== "" && form.endDay !== "") {
			endDate = `${form.endYear}-${form.endMonth}-${form.endDay}`;
		}
		if (startDate && !endDate) {
			endDate = "2020-01-01";
		}
		if (!startDate && endDate) {
			startDate = "2015-01-01";
		}
		submit({
			category: form.category === "" ? false : form.category,
			subcategory: form.subcategory === "" ? false : form.subcategory,
			product: form.product === "" ? false : form.product,
			country: form.country === "" ? false : form.country,
			market: form.market === "" ? false : form.market,
			source: form.source === "" ? false : form.source,
			currency: form.currency === "" ? false : form.currency,
			start: startDate,
			end: endDate,
		});
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
								<option value={cat}>{cat}</option>
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
								<option value={sub}>{sub}</option>
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
								<option value={prod}>{prod}</option>
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
								<option value={country.code}>{country.name}</option>
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
								<option value={market}>{market}</option>
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
								<option value={source}>{source}</option>
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
								<option value={curr}>{curr}</option>
							))}
						</Form.Control>
					</Form.Group>
				</Col>
			</Form.Row>
			<Form.Row>
				<Col>
					<Form.Label>Start date</Form.Label>
					<Form.Row>
						<Col>
							<Form.Control
								as="select"
								name="startYear"
								value={form.startYear}
								onChange={handleChange}
							>
								<option value="">Year</option>
								<option value="2019">2019</option>
								<option value="2018">2018</option>
								<option value="2017">2017</option>
								<option value="2016">2016</option>
								<option value="2015">2015</option>
							</Form.Control>
						</Col>
						<Col>
							<Form.Control
								as="select"
								name="startMonth"
								value={form.startMonth}
								onChange={handleChange}
							>
								<option value="">Month</option>
								<option value="01">January</option>
								<option value="02">February</option>
								<option value="03">March</option>
								<option value="04">April</option>
								<option value="05">May</option>
								<option value="06">June</option>
								<option value="07">July</option>
								<option value="08">August</option>
								<option value="09">September</option>
								<option value="10">October</option>
								<option value="11">November</option>
								<option value="12">December</option>
							</Form.Control>
						</Col>
						<Col>
							<Form.Control
								as="select"
								name="startDay"
								value={form.startDay}
								onChange={handleChange}
								disabled={!form.startDayOn}
							>
								<option value="">Day</option>
								{form.startDayOptions.map((day) => (
									<option value={day}>{day}</option>
								))}
							</Form.Control>
						</Col>
					</Form.Row>
				</Col>
				<Col>
					<Form.Label>End date</Form.Label>
					<Form.Row>
						<Col>
							<Form.Control
								as="select"
								name="endYear"
								value={form.endYear}
								onChange={handleChange}
							>
								<option value="">Year</option>
								<option value="2019">2019</option>
								<option value="2018">2018</option>
								<option value="2017">2017</option>
								<option value="2016">2016</option>
								<option value="2015">2015</option>
							</Form.Control>
						</Col>
						<Col>
							<Form.Control
								as="select"
								name="endMonth"
								value={form.endMonth}
								onChange={handleChange}
							>
								<option value="">Month</option>
								<option value="01">January</option>
								<option value="02">February</option>
								<option value="03">March</option>
								<option value="04">April</option>
								<option value="05">May</option>
								<option value="06">June</option>
								<option value="07">July</option>
								<option value="08">August</option>
								<option value="09">September</option>
								<option value="10">October</option>
								<option value="11">November</option>
								<option value="12">December</option>
							</Form.Control>
						</Col>
						<Col>
							<Form.Control
								as="select"
								name="endDay"
								value={form.endDay}
								onChange={handleChange}
								disabled={!form.endDayOn}
							>
								<option value="">Day</option>
								{form.endDayOptions.map((day) => (
									<option value={day}>{day}</option>
								))}
							</Form.Control>
						</Col>
					</Form.Row>
				</Col>
			</Form.Row>
			<Form.Row className="justify-content-center dashboard-form-button-row">
				<Button type="submit">Filter Data</Button>
			</Form.Row>
		</Form>
	);
}

export default DashForm;
