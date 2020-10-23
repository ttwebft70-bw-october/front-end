import React, { useState, useEffect } from "react";
import * as yup from "yup";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
// import Axios from "axios";
import {axiosWithAuth} from '../modules/axiosWithAuth';
import { useHistory } from "react-router-dom";

const itemSchema = yup.object().shape({
	item: yup.string().required("Name required"),
	description: yup.string().required("Description required"),
	price: yup.string().required("Price required"),
	amount: yup.number().min(0).required("Amount required"),
	location: yup.string().required("Location required"),
});

function NewItem() {
	const [form, setForm] = useState({
		item: "",
		description: "",
		price: "",
		amount: "",
		location: "",
	});
	const [buttonOn, setButtonOn] = useState(false);

	useEffect(() => {
		itemSchema.isValid(form).then((validity) => {
			setButtonOn(validity);
		});
	}, [form]);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setForm({ ...form, [name]: value });
		console.log(form)
	};
	const history = useHistory()
	const [id,setId]=useState()
	const handleSubmit = (e) => {
		
		const profile = JSON.parse(window.localStorage.getItem('profile'))
		setId(profile)
		e.preventDefault();
		axiosWithAuth()
		.post(`https://marketplace-backend-webft-70.herokuapp.com/api/profile/${id}/listings`,form)
		.then((res)=>{
			console.log(res)
			history.push('/listings')
		})
		.catch((err)=>{
			console.log(err)
		})
	};

	return (
		<Container>
			<h1>Add new item listing</h1>
			<Form onSubmit={handleSubmit}>
				<Form.Group controlId="itemName">
					<Form.Label>Name</Form.Label>
					<Form.Control
						name="item"
						type="text"
						placeholder="Enter the name of your item"
						onChange={handleChange}
					></Form.Control>
				</Form.Group>
				<Form.Group controlId="itemDescription">
					<Form.Label>Description</Form.Label>
					<Form.Control
						name="description"
						type="text"
						placeholder="Enter a description of your item"
						onChange={handleChange}
					></Form.Control>
				</Form.Group>
				<Form.Group controlId="itemPrice">
					<Form.Label>Price</Form.Label>
					<Form.Control
						name="price"
						type="text"
						placeholder="Enter the price of your item"
						onChange={handleChange}
					></Form.Control>
				</Form.Group>
				<Form.Group controlId="itemAmount">
					<Form.Label>Amount</Form.Label>
					<Form.Control
						name="amount"
						type="number"
						placeholder="Enter the amount available for sale"
						onChange={handleChange}
					></Form.Control>
				</Form.Group>
				<Form.Group controlId="itemLocation">
					<Form.Label>Location</Form.Label>
					<Form.Control
						name="location"
						type="text"
						placeholder="Enter the location of your item"
						onChange={handleChange}
					></Form.Control>
				</Form.Group>
				<Button variant="primary" type="submit" disabled={!buttonOn}>
					Submit
				</Button>
			</Form>
		</Container>
	);
}

export default NewItem;
