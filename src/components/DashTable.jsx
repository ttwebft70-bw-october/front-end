import React from "react";
import Table from "react-bootstrap/Table";

function DashTable(props) {
	const { data } = props;

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
						<td>{record.date}</td>
						<td>{record.country}</td>
						<td>{record.market}</td>
						<td>{record.product}</td>
						<td>
							{record.retail}
							{record.currency}
						</td>
						<td>
							{record.wholesale}
							{record.currency}
						</td>
						<td>{record.source}</td>
					</tr>
				))}
			</tbody>
		</Table>
	);
}

export default DashTable;
