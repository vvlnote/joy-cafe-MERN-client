import React, { Component } from 'react';
import { updateIngredientIneventory } from  '../actions/types';
import { connect } from 'react-redux';


class IngredientOrderForm extends Component {

	state = {
		amount: ''
	}

	handleOnChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value
		})
	}

	handleOnSubmit = (event) => {
		event.preventDefault();

		let obj = this.props.ingredient;
		obj.available_amount = obj.available_amount + parseFloat(this.state.amount).toFixed(2);
		if (obj.available_amount > obj.low_amount_alert){
			obj.alert = false;
		}

		this.props.updateIngredientIneventory(obj);
		this.setState({amount: ''});
		this.props.hideForm();
	}

	handleClickCancel = () => {

	}

	render() {
		return (
			<div>
				<h2>Order {this.props.ingredient.name}</h2>
				<form onSubmit={this.handleOnSubmit}>
					<input type="text" name='amount' value={this.state.amount} onChange={this.handleOnChange}/>
					<input type='submit'/>
					<button onClick={this.handleClickCancel}>Cancel</button>
				</form>
			</div>

		)
	}

}

export default connect(null, {updateIngredientIneventory})(IngredientOrderForm);