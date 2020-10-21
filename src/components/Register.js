import React, { useState, useEffect } from "react";
import * as yup from "yup";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { useHistory } from "react-router-dom";
const registerSchema = yup.object().shape({
	username: yup.string().required("Username required"),
	business: yup.string().required("Business name required"),
	email: yup.string().email("Invalid email address").required("Email required"),
	password: yup
		.string()
		.min(6, `Password must be 6 characters or longer`)
		.required("Password required"),
	tos: yup.boolean().oneOf([true], "TOS acknowledgement required"),
});

function Register() {
	const history = useHistory();
	const [form, setForm] = useState({
		username: "",
		business: "",
		email: "",
		password: "",
		tos: false,
	});
	const [buttonOn, setButtonOn] = useState(false);

	useEffect(() => {
		registerSchema.isValid(form).then((validity) => {
			setButtonOn(validity);
		});
	}, [form]);

	const handleChange = (e) => {
		const { name, value, type, checked } = e.target;
		if (type === "checkbox") {
			setForm({ ...form, [name]: checked });
		} else {
			setForm({ ...form, [name]: value });
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const creds = {
			username: form.username,
			password: form.password,
		};
		//	However you want to handle new user registration
		axios
			.post(
				"https://marketplace-backend-webft-70.herokuapp.com/api/auth/register",
				creds
			)
			.then((res) => {
				window.localStorage.setItem("token", res.data.token);
				console.log("success!");
				history.push("/Dashboard");
			})
			.catch((err) => {
				console.log(err);
			});
	};

	return (
		<Container>
			<h1>Register</h1>
			<Form onSubmit={handleSubmit}>
				<Form.Group controlId="registerUsername">
					<Form.Label>Username</Form.Label>
					<Form.Control
						name="username"
						type="text"
						placeholder="Enter your username"
						onChange={handleChange}
					></Form.Control>
				</Form.Group>
				<Form.Group controlId="registerBusiness">
					<Form.Label>Business</Form.Label>
					<Form.Control
						name="business"
						type="text"
						placeholder="Enter business name"
						onChange={handleChange}
					></Form.Control>
				</Form.Group>
				<Form.Group controlId="registerEmail">
					<Form.Label>Email address</Form.Label>
					<Form.Control
						name="email"
						type="email"
						placeholder="Enter email address"
						onChange={handleChange}
					></Form.Control>
				</Form.Group>
				<Form.Group controlId="registerPassword">
					<Form.Label>Password</Form.Label>
					<Form.Control
						name="password"
						type="password"
						placeholder="Enter password"
						onChange={handleChange}
					></Form.Control>
				</Form.Group>
				<Form.Group controlId="registerTos">
					<Form.Check
						name="tos"
						type="checkbox"
						onChange={handleChange}
						checked={form.tos}
						label="I have read and agree to the Terms of Service"
					></Form.Check>
				</Form.Group>
				<Button variant="primary" type="submit" disabled={!buttonOn}>
					Register
				</Button>
			</Form>
		</Container>
	);
}

export default Register;
