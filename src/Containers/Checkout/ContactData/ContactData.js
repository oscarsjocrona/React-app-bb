import React, { Component } from 'react';
import Button from '../../../Components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios';
import Spinner from '../../../Components/UI/Spinner/Spinner';
import Input from '../../../Components/UI/Input/Input';
import { connect } from 'react-redux';
import * as orderActions from './../../../Store/actions/index';
import withErrorHandler from '../../../HOC/withErrorHandler/withErrorHandler';

class ContactData extends Component {
    state = {
        orderForm: {
            name: this.getInputData('input', 'text', 'Your Name', 'Oscar Sjöcrona', 10, 100),
            street: this.getInputData('input', 'text', 'Street', 'Bankgatan test'),
            zipCode: this.getInputData('input', 'text', 'ZIP code', '12345', 5, 5),
            country: this.getInputData('input', 'text', 'Country', 'Schweden'),
            email: this.getInputData('input', 'email', 'Your Email', 'oscarsjocrona@gmail.com'),
            deliverMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        { value: 'fastest', displayValue: 'Fastest' },
                        { value: 'cheapest', displayValue: 'Cheapest' }
                    ]
                },
                value: 'fastest',
                validation: {},
                valid: true
            },
        },
        formIsValid: false
    }

    getInputData(elementType, type, placeholder, value, minLength = null, maxLength = null) {
        return {
            elementType: elementType,
            elementConfig: {
                type: type,
                placeholder: placeholder
            },
            value: value,
            validation: {
                required: true,
                minLength: minLength,
                maxLength: maxLength
            },
            valid: false,
            touched: false
        };
    }

    checkValidity(value, rules) {
        let isValid = true;

        if (rules) {
            if (rules.required) {
                isValid = value.trim() !== '';
            }

            if (rules.minLength && isValid) {
                isValid = value.length >= rules.minLength;
            }

            if (rules.maxLength && isValid) {
                isValid = value.length <= rules.maxLength;
            }
        }

        return isValid;
    }

    orderHandler = (event) => {
        event.preventDefault(); //Prevent to send request which will automatically reload the page (re-render)
        // this.setState({ loading: true });

        const formData = {};
        for (let formElementIdentifier in this.state.orderForm) {
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
        }

        const order = {
            ingredients: this.props.ings,
            price: this.props.price,
            orderData: formData
        }

        this.props.onOrderBurger(order);
    }

    inputChangedHandler = (event, inputIdentifier) => {
        const updatedOrderForm = {
            ...this.state.orderForm
        }
        const updatedFormElement = {  // {...obj}  doesnt deep clone the object, so every level needs to be cloned
            ...updatedOrderForm[inputIdentifier]
        }
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;

        console.log('updatedOrderForm: ');
        console.log(updatedOrderForm);
        updatedOrderForm[inputIdentifier] = updatedFormElement;

        let isValid = true;
        for (let inputElementIdentifier in updatedOrderForm) {
            isValid = isValid && (updatedOrderForm[inputElementIdentifier].valid == null || updatedOrderForm[inputElementIdentifier].valid);
        }

        this.setState({
            orderForm: updatedOrderForm,
            formIsValid: isValid
        });

        console.log(this.state.orderForm);
    }


    render() {

        const formElements = [];
        for (let key in this.state.orderForm) {
            formElements.push({
                id: key,
                config: this.state.orderForm[key]
            })
        }

        let orderComponent = null;
        if (this.props.loading) {
            orderComponent = (<Spinner />);
        }
        else {
            orderComponent = (

                <form onSubmit={this.orderHandler}>
                    {formElements.map(formElement => {
                        return (<Input
                            key={formElement.id}
                            elementType={formElement.config.elementType}
                            elementConfig={formElement.config.elementConfig}
                            value={formElement.value}
                            invalid={!formElement.config.valid}
                            touched={formElement.config.touched}
                            shouldValidate={formElement.config.validation}
                            changed={(event) => this.inputChangedHandler(event, formElement.id)} />)
                    })}
                    <Button ButtonType="Success" disabled={!this.state.formIsValid}>ORDER</Button>
                </form>
            );
        }

        return (<div className={classes.ContactData}><h4>Enter your contact information</h4>
            {orderComponent}
        </div>);
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilderReducer.ingredients,
        price: state.burgerBuilderReducer.totalPrice,
        loading: state.orderReducer.loading

    };
}

const mapDispatchToProps = dispatch => {
    return {
        onOrderBurger: (orderData) => dispatch(orderActions.purchaseBurger(orderData))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));