import React from "react";
import { Link } from "react-router-dom";

function Nav() {
	return (
		<nav>
			<div className="nav-container">
				<Link to={"/new-item"}>New Item</Link>
				<Link to={`/profile`}>Your Profile</Link>
				<Link to={"/"}>Login</Link>
			</div>
		</nav>
	);
}

export default Nav;
