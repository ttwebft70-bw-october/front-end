import React from "react";

function ItemListing(props) {
	const { item } = props;

	return (
		<div className="listing">
			<div className="listing-container-top">
				<h2 className="listing-item">{item.item}</h2>
				<p className="listing-amount">{item.amount}</p>
			</div>
			<div className="listing-container-bottom">
				<p className="listing-location">{item.location}</p>
				<p className="listing-description">{item.description}</p>
			</div>
		</div>
	);
}

export default ItemListing;
