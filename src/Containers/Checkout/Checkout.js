import React, { Component } from 'react';
import CheckoutSummary from './CheckoutSummary/CheckoutSummary';
import { Route, Redirect } from 'react-router-dom';
import ContactData from './ContactData/ContactData';
import { connect } from 'react-redux';
import * as actions from './../../Store/actions/index';


class Checkout extends Component {

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    render() {
        let summary = (<Redirect to="/"></Redirect>);
        if (this.props.ings) {
            const purchasedRedirect = this.props.purchased ? <Redirect to="/" /> : null;
            summary = (<div>
                {purchasedRedirect}
                <CheckoutSummary
                    ingredients={this.props.ings}
                    checkoutCancelled={this.checkoutContinuedHandler}
                    checkoutContinued={this.checkoutCancelledHandler}></CheckoutSummary>
                <Route path={this.props.match.path + '/contact-data'}
                    component={ContactData}></Route></div>)
        }
        return summary;
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilderReducer.ingredients,
        purchased: state.orderReducer.purchased
    };
};

export default connect(mapStateToProps)(Checkout);