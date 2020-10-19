import React, { useState } from "react";

function Register() {
	const [form, setForm] = useState({
		name: "",
		business: "",
		email: "",
		password: "",
		tos: false,
	});

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
		//	However you want to handle new user registration
	};

	return (
		<form onSubmit={handleSubmit}>
			<label>
				Name
				<input
					name="name"
					type="text"
					onChange={handleChange}
					value={form.name}
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
					name="name"
					type="checkbox"
					onChange={handleChange}
					value={form.tos}
					checked={form.tos}
				/>
			</label>
			<button>Submit</button>
		</form>
	);
}

export default Register;
