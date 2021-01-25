import React, {Component} from 'react';
import Auxilliary from '../../../HOC/Auxilliary/Auxilliary';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component { 
    //THis could be a functional component
    
    render () {
        const ingredientSummary = Object.keys(this.props.ingredients).map(igKey => {
            return  (<li key= { igKey}>
                        <span style={{textTransform: 'capitalize'}} >{igKey}</span>: {this.props.ingredients[igKey]}
                    </li>)
        });

        return (
            <Auxilliary>
                <h3>Your Order</h3>

                <p>A delcious burger with the following ingredients: </p>    
                <ul>
                    {ingredientSummary}
                </ul>
                <p><strong>TOTAL PRICE: {this.props.price.toFixed(2)}</strong></p>
                <p>Continue to checkout</p>
                <Button ButtonType = "Danger" clicked = {this.props.cancelPurchase}>CANCEL</Button>
                <Button ButtonType = "Success" clicked = {this.props.continuePurchase}>CONTINUE</Button>
            </Auxilliary>
        )
    }
};

export default OrderSummary;