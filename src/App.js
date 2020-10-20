import React from "react";
import { BrowserRouter as Router, Route, Switch, Link  } from 'react-router-dom';
import "./App.css";
import Register from "./components/Register";
import Login from "./components/Login";
import NewItem from './components/NewItem'
import Dashboard from "./components/Dashboard";

function App() {
	
	return (
		<div className="App">
			<Router>
			<Switch>
				<Route exact path="/">
					<Login />
					Don't have an account?<Link to='register'>  Register </Link>
				</Route>
				<Route path="/dashboard">
					<Dashboard />
				</Route>
				<Route path="/register">
					<Register />
				</Route>
				<Route path="/new-item">
					<NewItem />
				</Route>
			</Switch>
			</Router>
		</div>
	);
}

export default App;
