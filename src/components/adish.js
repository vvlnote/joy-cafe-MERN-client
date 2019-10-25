import React, { Component } from 'react';
import images from './images';

class ADish extends Component {

	state = {
		dishId: this.props.dish.id,
		orders: 0,
		imageId: this.props.imageId
	}


	componentDidMount = () => {
		let src = (images.find(img => img.id === this.state.imageId)).src;
		this.setState({
			srcImage :  src
		})
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

	findImgSrc = () => {
		return ((images.find(img => img.id === this.state.imageId)).src);
	}


	render(){

		const style = {
			image: {
				width:"200pt",
				height:"200pt",
				float:'left',
				border:"outset",
				borderColor:"gray"

			}
		}
		const clearfix = {
			overflow:"auto",
			padding:'2px'
		}

		const imagePath = require.context('../../public/dishImages', true);
		let imgsrc = this.findImgSrc();
		let image = imagePath(`./${imgsrc}`);
		console.log(image);
	

		return(
			<div style={clearfix}>
				<img src={`${image}`} style ={style.image}/>
				<h3>{this.props.dish.name} - ${this.props.dish.price}</h3>
				<h4>Order:{this.state.orders}</h4>

				<button onClick={this.onHandleIncrease}>+</button>
				
				<button onClick={this.onHandleDecrease}>-</button>
			</div>
		) 
	}

}

export default ADish;