import React, { useState, useEffect } from "react";
import * as yup from "yup";
import axios from 'axios';
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
	const history = useHistory()
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
		}
		//	However you want to handle new user registration
		axios 
        .post('https://marketplace-backend-webft-70.herokuapp.com/api/auth/register',creds)
        .then((res)=>{
            window.localStorage.setItem('token',res.data.token)
            console.log('success!')
            history.push('/Dashboard')
        })
        .catch((err)=>{
            console.log(err)
        })
	};

	return (
		<form onSubmit={handleSubmit}>
			<label>
				Username
				<input
					name="username"
					type="text"
					onChange={handleChange}
					value={form.username}
				/>
			</label>
			<label>
				Business Name
				<input
					name="business"
					type="text"
					onChange={handleChange}
					value={form.business}
				/>
			</label>
			<label>
				Email
				<input
					name="email"
					type="text"
					onChange={handleChange}
					value={form.email}
				/>
			</label>
			<label>
				Password
				<input
					name="password"
					type="password"
					onChange={handleChange}
					value={form.password}
				/>
			</label>
			<label>
				I have read and agree to the Terms of Service
				<input
					name="tos"
					type="checkbox"
					onChange={handleChange}
					value={form.tos}
					checked={form.tos}
				/>
			</label>
			<button disabled={!buttonOn}>Submit</button>
		</form>
	);
}

export default Register;
