import React from "react";
import { useParams } from "react-router-dom";

function Profile() {
	//	For buidling the page out while we wait for the backend
	const fakeProfile = {
		user_id: 1,
		first_name: "Tom",
		last_name: "Nook",
		business: "Nook Inc.",
	};

	return (
		<div className="profile">
			<h1>
				{fakeProfile.first_name} {fakeProfile.last_name}
			</h1>
			<h2>From {fakeProfile.business}</h2>
		</div>
	);
}

export default Profile;
