import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';


class AnOrder extends Component {

	onHandlePayment = () => {
		this.props.orderPaid(this.props.order);

	}
	render() {
		let totalPrice = 0;
		let orderDetail = this.props.order.receipts.map((r) => {
			totalPrice += (r.price * r.orders); 
			return(<li> {r.dishName} - {r.orders} orders - ${r.price}/order </li>)
		})

		return (
			<div>
			<h3>Order Of {this.props.order.tableId}</h3>
			{orderDetail}
			<hr/>
			<span>Total: ${totalPrice.toFixed(2)}</span>
			<Button variant='light' onClick={this.onHandlePayment}>Pay</Button>
			</div>
		)
	}

}

export default AnOrder;