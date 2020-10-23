import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import NewItem from "./components/NewItem";
import Dashboard from "./components/Dashboard";
import Profile from "./components/Profile";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Listings from './components/Listings.jsx';

function App() {
	return (
		<div className="App">
			<Navbar variant="dark" bg="primary">
				<Navbar.Brand href="/">African Marketplace</Navbar.Brand>
				<Nav>
					<Nav.Link href="/listings">Listings</Nav.Link>
					<Nav.Link href="/new-item">New Item</Nav.Link>
					<Nav.Link href="/profile">Profile</Nav.Link>
					<Nav.Link href="/login">Login</Nav.Link>
				</Nav>
			</Navbar>

			<Router>
				<Switch>
					<Route exact path="/">
						<Dashboard />
					</Route>
					<Route path="/register">
						<Register />
					</Route>
					<Route path="/login">
						<Login />
					</Route>
					<Route path='/listings' component={Listings} />
					<Route path="/profile" component={Profile} />
					<Route path="/new-item">
						<NewItem />
					</Route>
				</Switch>
			</Router>
		</div>
	);
}

export default App;
