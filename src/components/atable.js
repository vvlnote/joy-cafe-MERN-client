import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

class ATable extends Component {

	
	aTableStyle = { 
		postion: 'relative',
		left: 'auto',
		display: 'inline-block',
		border: 'double',
		height: '90px',
		width: '150px',
		textAlign: 'center',
		overflow:'auto',
		backgroundColor: 'light yellow'
	}

	render() {
		return (
			<div style={this.aTableStyle}>
				<h3>Table {this.props.name}</h3>
				<Link to={`/Orders/table${this.props.name}`}>
					<Button variant="success">Order</Button>
				</Link>
			</div>

			)
	}
}

export default ATable;