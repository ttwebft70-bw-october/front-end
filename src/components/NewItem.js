import React, { useState, useEffect } from "react";
import * as yup from "yup";

const itemSchema = yup.object().shape({
	item: yup.string().required("Name required"),
	description: yup.string().required("Description required"),
	price: yup.string().required("Price required"),
	quantity: yup.number().min(0).required("Quantity required"),
	location: yup.string().required("Location required"),
});

function NewItem() {
	const [form, setForm] = useState({
		item: "",
		description: "",
		price: "",
		quantity: "",
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
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		//	However you want to handle new item submission
	};

	return (
		<div className="new-item">
			<div className="form-container">
				<form onSubmit={handleSubmit}>
					<label>
						<span>Name</span>
						<input
							name="item"
							type="text"
							onChange={handleChange}
							value={form.item}
						/>
					</label>
					<label>
						<span>Description</span>
						<input
							name="description"
							type="text"
							onChange={handleChange}
							value={form.description}
						/>
					</label>
					<label>
						<span>Price</span>
						<input
							name="price"
							type="text"
							onChange={handleChange}
							value={form.price}
						/>
					</label>
					<label>
						<span>Quantity</span>
						<input
							name="quantity"
							type="number"
							onChange={handleChange}
							value={form.quantity}
						/>
					</label>
					<label>
						<span>Location</span>
						<input
							name="location"
							type="text"
							onChange={handleChange}
							value={form.location}
						/>
					</label>
					<div className="button-container">
						<button disabled={!buttonOn}>Submit</button>
					</div>
				</form>
			</div>
		</div>
	);
}

export default NewItem;
