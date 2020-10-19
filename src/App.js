import React from "react";
import { Route, Switch } from "react-router-dom";
import logo from "./logo.svg";
import "./App.css";
import Register from "./components/Register";
import Login from "./components/Login";
import NewItem from './components/NewItem'

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
				<Route path="/new-item">
					<NewItem />
				</Route>
			</Switch>
		</div>
	);
}

export default App;
