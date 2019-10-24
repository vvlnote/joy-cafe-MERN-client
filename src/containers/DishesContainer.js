import React, { Component } from 'react';
import ADish from '../components/adish';
import { placeOrder } from '../actions/types';
import { fetchDishes } from '../actions/types';
import { prepareForCheckOut } from '../actions/types';
import { updateIngredientIneventory } from '../actions/types';
import { connect } from 'react-redux';
import images from '../components/images';

class DishesContainer extends Component {

	constructor() {
		super();
		this.orders = [];
		this.state = {
			displayOrders: false,
			disablePlaceOrderButton: true
		}
		
	}

  	componentDidMount() {
    	this.props.fetchDishes();

  	}

	getOrderedDish = (orderedDish) => {
	    if (this.orders.length === 0) {
	    	let obj = { dishId: orderedDish.dishId, orders: orderedDish.orders }
	    	this.orders.push(obj);
	    } else {
	     	let i = this.orders.findIndex((e) => e.dishId === orderedDish.dishId);
	     	if (i >= 0) {
	     		this.orders[i] = {dishId: orderedDish.dishId, orders: orderedDish.orders};
	     	} else {
	     		this.orders.push({dishId: orderedDish.dishId, orders: orderedDish.orders})
	     	}

     	};
     	console.log(this.orders);
	}

	onHandlePlaceOrder = () => {
		debugger;
		this.setState({displayOrders: true})
		this.setState({disablePlaceOrderButton: false})
		let checkOutReceipts = [];
		let ingredientsUsage = [];
		this.orders.forEach((e) => {
			debugger;
			let dish = this.props.dishes.find((dish) => e.dishId === dish.id);
			if (e.orders > 0){
				dish.total_orders = dish.total_orders + e.orders;
				ingredientsUsage = this.collectIngredientUsage(ingredientsUsage, e.orders, dish);
				let rObj = {dishName: dish.name, price: dish.price, orders: e.orders};
				checkOutReceipts.push(rObj);
				setTimeout(() => {this.props.placeOrder(e.dishId, dish)
				},3000);
			}

		})
		this.updateIngredientsInventory(ingredientsUsage);
		this.props.prepareForCheckOut(this.props.match.params.id, checkOutReceipts);
	}

	collectIngredientUsage(ingredientUsage, orders, dish){
		dish.ingredients.forEach((dIngredient) =>{
			debugger;
			let dishIngredientsUsage = dIngredient.usage * orders;
			if (ingredientUsage.length > 0) {
				let index = ingredientUsage.findIndex((item) => item.id === dIngredient.id);
				if (index >=0 ){
					ingredientUsage[index] = this.updateIngredientUsage(ingredientUsage[index], dishIngredientsUsage);
				} else {
					let ingredient = this.props.ingredients.find((item) => item.id === dIngredient.id);
					let obj = this.updateIngredientUsage(ingredient, dishIngredientsUsage);
					ingredientUsage.push(obj);
				}
			} else {
					let ingredient = this.props.ingredients.find((item) => item.id === dIngredient.id);
					let obj = this.updateIngredientUsage(ingredient, dishIngredientsUsage);
					ingredientUsage.push(obj);
			}
		})
		return ingredientUsage; 
	}

	updateIngredientUsage(ingredient, usage) {
		debugger;
		ingredient.available_amount -= usage;
		ingredient.used_amount += usage;
		if (ingredient.available_amount <= ingredient.low_amount_alert) {
			ingredient.alert = true;
		}
		return ingredient;
	}

	updateIngredientsInventory(ingredientsUsage) {
		ingredientsUsage.forEach((ingredient) => {
			setTimeout(() => {this.props.updateIngredientIneventory(ingredient)}, 3000);
			
		})
	}

	findDishImage = (dishName) => {
		return (images.filter(imageItem => 
			imageItem.title.toLowerCase() === dishName.toLowerCase()))[0].id;
	}

	render() {

		let dishes = this.props.dishes.map((dish, i) => {
			let imageId = this.findDishImage(dish.name);
			debugger;
			return <ADish key={i} dish={dish} imageId={imageId} totalOrders={this.state} getData={this.getOrderedDish}/>
		});

		let displayOrders = null;
		if (this.state.displayOrders) {
			displayOrders = this.orders.map((order, i) => {
				let obj = this.props.dishes.find((d) => d.id === order.dishId);
				return <li key={i}>{obj.name} - {order.orders} </li>
			});
		}

		return (
		 	<div style={{textAlign: 'center'}}>
			<h2> {this.props.match.params.id} to Order</h2>
			<div>
				{dishes}
				<button disabled={!this.state.disablePlaceOrderButton} onClick={this.onHandlePlaceOrder}>Place Order</button>
				{displayOrders}
			</div>
			</div>	

			)
	}
}

const mapStateToProps = state => {
  console.log("DishesContainer => ", state);
  return {
    dishes: state.dishes,
    ingredients: state.inventory
  }
}


export default connect(mapStateToProps, { fetchDishes, placeOrder, prepareForCheckOut, updateIngredientIneventory })(DishesContainer);