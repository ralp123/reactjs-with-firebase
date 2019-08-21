import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
//import { Router, Link } from "@reach/router";
import Home from './Home';
import Profile from './Profile';

//import Test from './Test';

function App() {
	return (
	  	<Router>
			<div className="container-fluid">
				<nav className="navbar navbar-expand-sm bg-dark navbar-dark justify-content-end">
					
					<Link className="navbar-brand" to="/">Brand</Link>

				
					<ul className="navbar-nav ml-auto">
						<li className="nav-item">
							<Link className="nav-link" to="/">Home</Link>
						</li>
						<li className="nav-item">
							<Link className="nav-link" to="/profile" component={Profile}>Profile</Link>
						</li>
					</ul>
				</nav>
			</div>
			<div className="container">
				<Route exact path="/" component={HomePage} />
				<Route path="/profile" component={ProfilePage} />
			</div>
	  	</Router>
	);
  }
  
function HomePage() {
	return (
		<>
			<Home />
		</>
	);
}

function ProfilePage() {
	return (
		<>
			<Profile />
		</>
	);
}
  
function About() {
	return (
	  <div>
		<h2>About</h2>
	  </div>
	);
}

export default App;
