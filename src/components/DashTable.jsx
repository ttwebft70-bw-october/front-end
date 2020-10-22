import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";

function DashTable(props) {
	const { countries, baseQuery } = props;
	const initTable = {
		data: [[]],
		index: 0,
		next: "",
		nextOnDeck: "",
		buttonNextOn: false,
		buttonPrevOn: false,
	};
	const [table, setTable] = useState(initTable);

	const sautiAPI = axios.create({
		baseURL: "https://market-price-api.herokuapp.com/sauti/developer/filter/",
		headers: { key: process.env.REACT_APP_SAUTI_API_KEY },
	});

	useEffect(() => {
		sautiAPI
			.get(baseQuery)
			.then((res) => {
				setTable({
					...initTable,
					data: [res.data.records],
					next: res.data.next,
				});
			})
			.catch((err) => {
				console.error(err);
			});
	}, [baseQuery]);

	//	Get next page data in the background to reduce user wait times
	useEffect(() => {
		if (table.next !== "" && table.index + 1 === table.data.length) {
			sautiAPI
				.get(`${baseQuery}&next=${table.next}`)
				.then((res) => {
					setTable({
						...table,
						data: [...table.data, res.data.records],
						next: "",
						nextOnDeck: res.data.next,
						buttonNextOn: true,
					});
				})
				.catch((err) => {
					console.error(err);
				});
		}
	}, [table.next]);

	//	Helper function to round prices to two decimal points, unless the price is an integer, which is the case for some currencies supported by the Sauti API
	const roundPrice = (price) => {
		if (Number.isInteger(price)) {
			return price;
		} else {
			return price.toFixed(2);
		}
	};

	//	Development
	useEffect(() => {
		console.log(table);
	}, [table]);

	const handleNext = () => {
		let newTable = { ...table, index: table.index + 1 };
		if (newTable.index + 1 === table.data.length) {
			newTable.buttonNextOn = false;
			newTable.next = table.nextOnDeck;
			newTable.nextOnDeck = "";
		}
		if (!table.buttonPrevOn) {
			newTable.buttonPrevOn = true;
		}
		setTable(newTable);
	};

	const handlePrev = () => {
		let newTable = { ...table, index: table.index - 1 };
		if (newTable.index === 0) {
			newTable.buttonPrevOn = false;
		}
		setTable(newTable);
	};

	return (
		<div>
			<Button disabled={!table.buttonPrevOn} onClick={handlePrev}>
				Prev
			</Button>
			<Button disabled={!table.buttonNextOn} onClick={handleNext}>
				Next
			</Button>
			<Table striped border hover>
				<thead>
					<th>Date</th>
					<th>Country</th>
					<th>Market</th>
					<th>Product</th>
					<th>Retail</th>
					<th>Wholesale</th>
					<th>Source</th>
				</thead>
				<tbody>
					{table.data[table.index].map((record) => (
						<tr>
							<td>{record.date.slice(0, 10)}</td>
							<td>{countries.find((c) => c.code === record.country).name}</td>
							<td>{record.market}</td>
							<td>{record.product}</td>
							<td>
								{roundPrice(record.retail)}
								{record.currency}/{record.unit}
							</td>
							<td>
								{roundPrice(record.wholesale)}
								{record.currency}/{record.unit}
							</td>
							<td>{record.source}</td>
						</tr>
					))}
				</tbody>
			</Table>
		</div>
	);
}

export default DashTable;
