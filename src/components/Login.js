import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import * as yup from "yup";
import axios from 'axios';
import { useHistory } from "react-router-dom";

const loginSchema = yup.object().shape({
	email: yup.string().email("Invalid email address").required("Email required"),
	password: yup
		.string()
		.min(6, `Password must be 6 characters or longer`)
		.required("Password required"),
});

function Login() {
	const [form, setForm] = useState({
		email: "",
		password: "",
	});
	const [buttonOn, setButtonOn] = useState(false);
	const history = useHistory()
	useEffect(() => {
		loginSchema.isValid(form).then((validity) => {
			setButtonOn(validity);
		});
	}, [form]);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setForm({ ...form, [name]: value });
		console.log(form)
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		//	However you want to handle new user registration
		axios 
        .post('https://marketplace-backend-webft-70.herokuapp.com/api/auth/login' ,form)
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
		<div className="login">
			<div className="form-container">
				<h1>Login</h1>
				<form onSubmit={handleSubmit}>
					<label>
						<span>Email</span>
						<input
							name="email"
							type="text"
							onChange={handleChange}
							value={form.email}
						/>
					</label>
					<label>
						<span>Password</span>
						<input
							name="password"
							type="password"
							onChange={handleChange}
							value={form.password}
						/>
					</label>
					<div className="button-container">
						<Link to={"/"}>
							<button disabled={!buttonOn}>Login</button>
						</Link>
						<Link to={"/register"}>
							<button>Sign up</button>
						</Link>
					</div>
				</form>
			</div>
		</div>
	);
}

export default Login;
