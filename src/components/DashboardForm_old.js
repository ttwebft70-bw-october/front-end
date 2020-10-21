import React, { useState } from "react";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function DashboardForm(props) {
	const { sauti, submit } = props;

	const [form, setForm] = useState({
		category: "",
		subcategoryList: [],
		subcategoryOn: false,
		subcategory: "",
		productList: [],
		productOn: false,
		product: "",
		submitOn: false,
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		let update = { ...form, [name]: value };
		if (value === "") {
			update.submitOn = false;
			if (name === "subcategory" || name === "category") {
				update.productList = [];
				update.productOn = false;
				update.product = "";
			}
			if (name === "category") {
				update.subcategoryList = [];
				update.subcategoryOn = false;
				update.subcategory = "";
			}
		} else {
			if (name === "category") {
				update.submitOn = false;
				update.subcategoryList = sauti.category[value].list;
				update.subcategoryOn = true;
				update.subcategory = "";
				update.productList = [];
				update.productOn = false;
				update.product = "";
			} else if (name === "subcategory") {
				update.submitOn = false;
				update.productList = sauti.category[form.category][value].list;
				update.productOn = true;
				update.product = "";
			} else if (name === "product") {
				update.submitOn = true;
			}
		}
		setForm(update);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		submit(form.product);
	};

	return (
		<Form onSubmit={handleSubmit}>
			<h2>Products by category</h2>
			<Form.Row>
				<Col>
					<Form.Group controlId="form.category">
						<Form.Label>Category</Form.Label>
						<Form.Control
							as="select"
							name="category"
							value={form.category}
							onChange={handleChange}
						>
							<option value=""></option>
							{sauti.category.list.map((cat) => (
								<option value={cat}>{cat}</option>
							))}
						</Form.Control>
					</Form.Group>
				</Col>
				<Col>
					<Form.Group controlId="form.subcategory">
						<Form.Label>Subcategory</Form.Label>
						<Form.Control
							as="select"
							name="subcategory"
							value={form.subcategory}
							onChange={handleChange}
							disabled={!form.subcategoryOn}
						>
							<option value=""></option>
							{form.subcategoryList.map((sub) => (
								<option value={sub}>{sub}</option>
							))}
						</Form.Control>
					</Form.Group>
				</Col>
				<Col>
					<Form.Group controlId="form.product">
						<Form.Label>Product</Form.Label>
						<Form.Control
							as="select"
							name="product"
							value={form.product}
							onChange={handleChange}
							disabled={!form.productOn}
						>
							<option value=""></option>
							{form.productList.map((prod) => (
								<option value={prod}>{prod}</option>
							))}
						</Form.Control>
					</Form.Group>
				</Col>
			</Form.Row>
			<Form.Row>
				

			</Form.Row>


			<Button disabled={!form.submitOn} onClick={handleSubmit}>
				Submit
			</Button>
		</Form>
	);
}

export default DashboardForm;
