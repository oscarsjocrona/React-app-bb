import React from 'react';
import Burger from '../../../Components/Burger/Burger';
import Button from '../../../Components/UI/Button/Button';
import classes from './CheckoutSummary.css';

const checkoutSummary = (props) => {
    return (
        <div className={classes.CheckoutSummary}>
            <h1>We hope it taste well!</h1>
            <div style={{ width: '100%', margin: 'auto' }}>
                <Burger ingredients={props.ingredients} />
            </div>
            <Button
                ButtonType="Success"
                clicked={props.checkoutCancelled}>Continue</Button>
            <Button
                ButtonType="Danger"
                clicked={props.checkoutContinued}>Cancel</Button>
        </div>
    );
}

export default checkoutSummary;