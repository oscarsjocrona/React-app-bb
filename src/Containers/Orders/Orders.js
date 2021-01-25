import React, { Component } from 'react';
import Order from './Order';
import axios from './../../axios';
import withErrorHandler from '../../HOC/withErrorHandler/withErrorHandler';
import { connect } from 'react-redux';
import * as actions from '../../Store/actions/index';
import Spinner from     './../../Components/UI/Spinner/Spinner';

class Orders extends Component {
    componentDidMount() {
        this.props.onFetchOrders();
    }

    render() {
        if(this.props.loading){
            return (<div><Spinner></Spinner></div>)
        }
        // this.state.orders.map(order => console.log(order));
        return (<div>
            {this.props.orders.map(order =>
                <Order
                    key={order.id}
                    ingredients={order.ingredients}
                    price={order.price} />)}
        </div>);
    }
}

const mapStateToProps = state => {
    return {
        orders: state.orderReducer.orders,
        loading: state.orderReducer.loading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: () => dispatch(actions.fetchOrders())
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));