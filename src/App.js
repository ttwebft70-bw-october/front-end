import React from "react";
import { Route, Switch } from "react-router-dom";
import Nav from "./components/Nav";
import Register from "./components/Register";
import Login from "./components/Login";
import NewItem from "./components/NewItem";
import Profile from "./components/Profile";

function App() {
	return (
		<div className="App">
			<Nav />
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
