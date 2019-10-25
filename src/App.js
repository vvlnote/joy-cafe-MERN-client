import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchIngredients } from './actions/types'
import DishesContainer from './containers/DishesContainer';
import { BrowserRouter as Router, Switch, Route }  from 'react-router-dom';
import Navbar from './components/navbar';
import Home from './containers/Home';
import InventoryContainer from './containers/InventoryContainer';
import "bootstrap/dist/css/bootstrap.min.css";


class App extends Component {


  	componentDidMount() {
    	this.props.fetchIngredients();

  	}

	render() {

		return(
			<Router>
			  	<div className="container">
					<Navbar />
					<br />
					<Switch>
					<Route exact path="/" component={Home} />
					<Route path="/Orders/:id" component={DishesContainer} />
					<Route path="/Inventory" component={InventoryContainer} />
					</Switch>
				</div>
			</Router>
			)
	}
}

export default connect(null, {fetchIngredients})(App);