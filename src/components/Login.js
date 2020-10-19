import React, { useState } from "react";

function Login() {
	const [form, setForm] = useState({
		email: "",
		password: "",
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setForm({ ...form, [name]: value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		//	However you want to handle new user registration
	};

	return (
		<form>
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
			<button>Login</button>
		</form>
	);
}

export default Login;
