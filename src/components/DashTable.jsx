import React, { useState, useEffect } from "react";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";

function DashTable(props) {
	const { countries, baseQuery } = props;
	const initTable = {
		data: [],
		index: 0,
		next: "",
		nextOnDeck: "",
		buttonNextOn: false,
		buttonPrevOn: false,
	};
	const [table, setTable] = useState(initTable);
	const [spinnerOn, setSpinnerOn] = useState(true);

	const sautiAPI = axios.create({
		baseURL: "https://market-price-api.herokuapp.com/sauti/developer/filter/",
		headers: { key: process.env.REACT_APP_SAUTI_API_KEY },
	});

	//	Get initial data
	const getInitialData = () => {
		setSpinnerOn(true);
		sautiAPI
			.get(baseQuery)
			.then((res) => {
				setTable({
					...initTable,
					data: [res.data.records],
					next: res.data.next,
				});
				setSpinnerOn(false);
			})
			.catch((err) => {
				console.error(err);
			});
	};
	useEffect(getInitialData, [baseQuery]);

	//	Get next page data in the background to reduce user wait times
	const getNextData = () => {
		if (table.next !== "" && table.index + 1 === table.data.length) {
			const sautiAPI = axios.create({
				baseURL:
					"https://market-price-api.herokuapp.com/sauti/developer/filter/",
				headers: { key: process.env.REACT_APP_SAUTI_API_KEY },
			});
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
	};
	useEffect(getNextData, [table.next]);

	//	Helper function to round prices to two decimal points, unless the price is an integer, which is the case for some currencies supported by the Sauti API
	const roundPrice = (price) => {
		if (Number.isInteger(price)) {
			return price;
		} else {
			return price.toFixed(2);
		}
	};

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

	return !spinnerOn ? (
		<Container fluid="true">
			<Row className="dashboard-button-row">
				<Col>
					<Button disabled={!table.buttonPrevOn} onClick={handlePrev}>
						Prev
					</Button>
				</Col>
				<Col xs="auto">
					<Button disabled={!table.buttonNextOn} onClick={handleNext}>
						{" "}
						<Spinner
							as="span"
							animation="border"
							size="sm"
							role="status"
							aria-hidden="true"
							hidden={table.buttonNextOn}
							className="dashboard-table-next-spinner"
						/>
						Next
					</Button>
				</Col>
			</Row>
			<Row>
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
			</Row>
			<Row className="dashboard-button-row">
				<Col>
					<Button disabled={!table.buttonPrevOn} onClick={handlePrev}>
						Prev
					</Button>
				</Col>
				<Col xs="auto">
					<Button disabled={!table.buttonNextOn} onClick={handleNext}>
						Next
					</Button>
				</Col>
			</Row>
		</Container>
	) : (
		<Container fluid="true">
			<Row className="justify-content-center">
				<Spinner
					animation="border"
					variant="light"
					className="dashboard-table-main-spinner"
				/>
			</Row>
		</Container>
	);
}

export default DashTable;
