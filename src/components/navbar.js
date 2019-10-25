import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {

	render() {
		return (
			<nav className="navbar navbar-expand-lg navbar-gray bg-gray">
				<Link to="/" className="navbar-brand">Joy Cafe App</Link>
					<div className="collpase navbar-collapse">
						<ul className="navbar-nav mr-auto">
							<li className="navbar-item">
								<Link to="/" className="nav-link">Home</Link>
							</li>
							<li className="navbar-item">
								<Link to="/Inventory" className="nav-link">Inventory</Link>
							</li>
						</ul>
					</div>
				</nav>
		)
	}

}