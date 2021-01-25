import React, { Component } from 'react';
import Auxilliary from '../../HOC/Auxilliary/Auxilliary';
import Burger from './../../Components/Burger/Burger';
import BuildControls from './../../Components/Burger/BuildControls/BuildControls';
import Modal from '../../Components/UI/Modal/Modal';
import OrderSummary from '../../Components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios';
import Spinner from '../../Components/UI/Spinner/Spinner';
import withErrorHandler from '../../HOC/withErrorHandler/withErrorHandler';
import * as actionTypes from '../../Store/actions/actionTypes';
import * as actions from './../../Store/actions/index'; 

import { connect } from 'react-redux';

class BurgerBuilder extends Component {
    constructor(props) {
        super();
        this.purchaseHandler = this.purchaseHandler.bind(this);
        this.state = {
            purchasing: false
        };
    }

    componentDidMount() {
        this.props.onInitiIngredients();
    }
        // axios.get('/ingredients.json')
        //     .then(response => {
        //         this.setState({ ingredients: response.data });
        //     }).catch(error => {
        //         this.setState({ error: true });
        //     });
    // }

    updatePurchaseState(ingredients) {
        const sum = Object.keys(ingredients)
            .map(key => {
                return ingredients[key];
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);

        return sum > 0;
    }

    purchaseHandler() {
        this.setState({ purchasing: true });
    }

    cancelPurchaseHandler = () => {
        this.setState({ purchasing: false });
    }

    purchaseContinueHandler = () => {
        this.props.onInitPurchase();
        this.props.history.push('/checkout');
    }

    //Lifecycle must-method
    render() {
        const disabledInfo = {
            ...this.state.ingredients
        };

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let orderSummaryScreen = null;

        let burger = this.props.error ? <p>Error. Ingredients can't be loaded</p> : <Spinner />;

        if (this.props.ings) {
            burger = (
                <Auxilliary>
                    <Burger ingredients={this.props.ings}></Burger>
                    <BuildControls
                        disabled={disabledInfo}
                        ingredientAdded={(ingredientName) => this.props.onIngredientAdded(ingredientName)}
                        ingredientRemoved={(ingredientName) => this.props.onIngredientRemoved(ingredientName)}
                        price={this.props.totalPrice}
                        purchasable={this.updatePurchaseState(this.props.ings)}
                        ordered={() => this.purchaseHandler()} />
                </Auxilliary>);

            orderSummaryScreen = (
                <OrderSummary
                    ingredients={this.props.ings}
                    price={this.props.totalPrice}
                    cancelPurchase={this.cancelPurchaseHandler}
                    continuePurchase={this.purchaseContinueHandler}></OrderSummary>);
        }

        // if (this.state.loading) {
        //     orderSummaryScreen = <Spinner />;
        // }

        return (
            <Auxilliary>
                <Modal show={this.state.purchasing} cancel={this.cancelPurchaseHandler}>
                    {orderSummaryScreen}
                </Modal>
                {burger}
            </Auxilliary>
        );
    }
} 

const mapStateToProps = (state) => {
    return {
        ings: state.burgerBuilderReducer.ingredients,
        totalPrice: state.burgerBuilderReducer.totalPrice,
        error: state.burgerBuilderReducer.error
    };
};


const mapDispatchToProps = (dispatch) => {
    return {
        onIngredientAdded: (ingredientName) => dispatch(actions.addIngredient(ingredientName)),
        onIngredientRemoved: (ingredientName) => dispatch(actions.removeIngredient(ingredientName)),
        onInitiIngredients: () => dispatch(actions.initIngredients()),
        onInitPurchase: () => dispatch(actions.purchaseInit())
    };
}

// const mapDispatchToProps = (dispatch) => {
//     return {
//         onIngredientAdded: (ingredientName) => dispatch({ type: actionTypes.ADD_INGREDIENTS, ingredientName: ingredientName }),
//         onIngredientRemoved: (ingredientName) => dispatch({ type: actionTypes.REMOVE_INGREDIENTS, ingredientName: ingredientName })
//     };
// }


export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));