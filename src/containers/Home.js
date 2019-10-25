import React, { Component } from 'react';
import { connect } from 'react-redux';
// import './App.css';
import ATable from '../components/atable';
import AnOrder from '../components/anOrder';
import { orderPaid } from '../actions/types';



class Home extends Component {
 

  initializeTables() {
    const tablesCount = 6;
    let array = [];
    for (let i = 0; i < tablesCount; i ++) {
      array.push(<ATable key={i} name={i+1}/>);
    }
    return array;
  }

  orderPaid = (order) =>{
    this.props.orderPaid(order);

  }


  render() {

    let tables = this.initializeTables();
    let orderSummary = null;
    if (this.props.orders.length) {
      orderSummary = this.props.orders.map((eachTable) => {
        return <AnOrder order={eachTable} orderPaid={this.orderPaid}/>
      })
    }

    return (
      <div className="App">
        {tables}
        <hr/>
        {orderSummary}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    orders: state.orders
  }
}


export default connect(mapStateToProps,{orderPaid})(Home);