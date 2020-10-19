import React from "react";
//	import { useParams } from "react-router-dom";
import ProfileListings from "./ProfileListings";

function Profile() {
	//	For buidling the page out while we wait for the backend
	const fakeProfile = {
		user_id: 1,
		first_name: "Tom",
		last_name: "Nook",
		business: "Nook Inc.",
	};

	const fakeListings = [
		{
			profile_id: 1,
			item: "Froggy Chair",
			description: "Green / Rustic / Cute / Chair",
			price: "1,440 Bells",
			amount: "1",
			location: "T&T Emporium, Floor 3",
		},
		{
			profile_id: 1,
			item: "Gracie Wall Clock",
			description: "Brown & Colorful / Trendy / Wall furniture",
			price: "150,000 Bells",
			amount: "1",
			location: "T&T Emporium, Floor 3",
		},
	];

	return (
		<div className="profile">
			<h1>
				{fakeProfile.first_name} {fakeProfile.last_name} from{" "}
				{fakeProfile.business}
			</h1>
			<h2>For Sale</h2>
			<ProfileListings listings={fakeListings} />
		</div>
	);
}

export default Profile;
