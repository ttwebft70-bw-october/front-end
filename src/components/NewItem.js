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
			<form onSubmit={handleSubmit}>
				<label>
					Name
					<input
						name="item"
						type="text"
						onChange={handleChange}
						value={form.item}
					/>
				</label>
				<label>
					Description
					<input
						name="description"
						type="text"
						onChange={handleChange}
						value={form.description}
					/>
				</label>
				<label>
					Price
					<input
						name="price"
						type="text"
						onChange={handleChange}
						value={form.price}
					/>
				</label>
				<label>
					Quantity
					<input
						name="quantity"
						type="number"
						onChange={handleChange}
						value={form.quantity}
					/>
				</label>
				<label>
					Location
					<input
						name="location"
						type="text"
						onChange={handleChange}
						value={form.location}
					/>
				</label>
				<button disabled={!buttonOn}>Submit</button>
			</form>
		</div>
	);
}

export default NewItem;
