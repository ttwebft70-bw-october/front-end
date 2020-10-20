import React from "react";
<<<<<<< HEAD
import { BrowserRouter as Router, Route, Switch, Link  } from 'react-router-dom';
import "./App.css";
import Register from "./components/Register";
import Login from "./components/Login";
import NewItem from './components/NewItem'
import Dashboard from "./components/Dashboard";
=======
import { Route, Switch } from "react-router-dom";
import Nav from "./components/Nav";
import Register from "./components/Register";
import Login from "./components/Login";
import NewItem from "./components/NewItem";
import Profile from "./components/Profile";
>>>>>>> 558352c30663b04d94f876d4ab1f2ebaf653ef40

function App() {
	
	return (
		<div className="App">
<<<<<<< HEAD
			<Router>
=======
			<Nav />
>>>>>>> 558352c30663b04d94f876d4ab1f2ebaf653ef40
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
