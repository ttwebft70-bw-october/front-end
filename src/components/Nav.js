import React from "react";
import { Link } from "react-router-dom";

function Nav() {
	return (
		<nav>
			<div className="nav-container">
				<div className="nav-app-title">
					<Link to={"/"}>African Marketplace</Link>
				</div>
				<div className="nav-links">
					<Link to={"/new-item"}>New Item</Link>
					<Link to={`/profile`}>Your Profile</Link>
					<Link to={"/"}>Login</Link>
				</div>
			</div>
		</nav>
	);
}

export default Nav;
