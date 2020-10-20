import React from "react";
import { Route, Switch } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import NewItem from "./components/NewItem";
import Profile from "./components/Profile";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

function App() {
	return (
		<div className="App">
			<Container>
				<Navbar>
					<Navbar.Brand href="/">African Marketplace</Navbar.Brand>
					<Nav.Link href="/new-item">New Item</Nav.Link>
					<Nav.Link href="/profile">Profile</Nav.Link>
					<Nav.Link href="/">Login</Nav.Link>
				</Navbar>
			</Container>
			<Switch>
				<Route exact path="/">
					<Login />
				</Route>
				<Route path="/register">
					<Register />
				</Route>
				<Route path="/profile" component={Profile} />
				<Route path="/new-item">
					<NewItem />
				</Route>
			</Switch>
		</div>
	);
}

export default App;
