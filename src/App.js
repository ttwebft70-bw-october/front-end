import React from "react";
import { Route, Switch } from "react-router-dom";
import logo from "./logo.svg";
import "./App.css";
import Register from "./components/Register";
import Login from "./components/Login";

function App() {
	return (
		<div className="App">
			<Switch>
				<Route exact path="/">
					<Login />
				</Route>
				<Route path="/register">
					<Register />
				</Route>
			</Switch>
		</div>
	);
}

export default App;
