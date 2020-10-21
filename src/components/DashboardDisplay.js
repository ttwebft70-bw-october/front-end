import React from "react";
import Table from "react-bootstrap/Table";

function DashboardDisplay(props) {
	const { data } = props;

	return (
		<div>
			<h3>{data[0].product}</h3>
			<Table striped border hover>
				<thead>
					<tr>
						<th>Date</th>
						<th>Source</th>
						<th>Market</th>
						<th>Price (Retail)</th>
						<th>Price (Wholesale)</th>
						<th>Currency</th>
					</tr>
				</thead>
				<tbody>
					{data.map((item) => (
						<tr>
							<td>{item.date}</td>
							<td>{item.source}</td>
							<td>{item.market}</td>
							<td>{item.retail}</td>
							<td>{item.wholesale}</td>
							<td>{item.currency}</td>
						</tr>
					))}
				</tbody>
			</Table>
		</div>
	);
}

export default DashboardDisplay;
