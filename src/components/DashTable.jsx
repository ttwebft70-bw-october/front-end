import React from "react";
import Table from "react-bootstrap/Table";

function DashTable(props) {
	const { data, countries } = props;

	const roundPrice = (price) => {
		if (Number.isInteger(price)) {
			return price;
		} else {
			return price.toFixed(2);
		}
	};

	return (
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
				{data.map((record) => (
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
	);
}

export default DashTable;
