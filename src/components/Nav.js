import React from "react"
import {Link} from "react-router-dom"

function Nav() {
	return(
		<nav>
			<Link to={'/new-item'}>New Item</Link>
			<Link to={'/'}>Login</Link>
		</nav> 
	)
}

export default Nav;