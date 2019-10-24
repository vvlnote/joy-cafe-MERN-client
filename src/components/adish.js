import React, { Component } from 'react';

class ADish extends Component {

	state = {
		dishId: this.props.dish.id,
		orders: 0
	}

	onHandleIncrease = () =>{

		this.setState({
			orders: ++this.state.orders 
		})

		this.props.getData(this.state);
	}
	
	onHandleDecrease = () =>{
		if(this.state.orders > 0)
		{
			this.setState({orders: --this.state.orders})
		}
		
		this.props.getData(this.state);
	}

	render(){
		
		return(
			<div>
				<h4>{this.props.dish.name} - ${this.props.dish.price}</h4>
				<button onClick={this.onHandleIncrease}>+</button>
				<span>{this.state.orders}</span>
				<button onClick={this.onHandleDecrease}>-</button>
			</div>
		) 
	}

}

export default ADish;