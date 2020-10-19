import React from "react";

function ItemListing(props) {
	const { item } = props;

	return (
		<div className="listing">
			<h2 className="listing-item">{item.item}</h2>
			<p className="listing-amount">{item.amount}</p>
			<p className="listing-location">{item.location}</p>
			<p className="listing-description">{item.description}</p>
		</div>
	);
}

export default ItemListing;
