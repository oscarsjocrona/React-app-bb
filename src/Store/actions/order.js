import * as actionTypes from './actionTypes';
import axios from './../../axios';

export const purchaseBurgerSuccess = (id, orderData) => {
        return {
                type: actionTypes.PURCHASE_BURGER_SUCCESS,
                orderId: id,
                orderData: orderData
        }
}

export const purchaseBurgerFailed = (error) => {
        return {
                type: actionTypes.PURCHASE_BURGER_FAILED,
                error: error
        }
}

export const purchaseBurgerStart = () => {
        return {
                type: actionTypes.PURCHASE_BURGER_START
        }
}

export const purchaseInit = () => {
        return {
                type: actionTypes.PURCHASE_INIT
        };
}

export const resetLoading = () => {
        return {
                type: actionTypes.RESET_LOADING
        }
}

export const fetchOrdersSuccess = (orders) => {
        return {
                type: actionTypes.FETCH_ORDERS_SUCCESS,
                orders: orders
        }
}

export const fetchOrdersFailed = (error) => {
        return {
                type: actionTypes.FETCH_ORDERS_FAILED,
                error: error
        }
}
//Async creator

export const fetchOrders = () => {
        return dispatch => {
                dispatch(resetLoading());
                axios.get('/orders.json')
                        .then(response => {
                                const fetchedOrders = [];
                                for (let key in response.data) {
                                        fetchedOrders.push({
                                                ...response.data[key],
                                                id: key
                                        });
                                }
                                dispatch(fetchOrdersSuccess(fetchedOrders));
                        }).catch(error => {
                                dispatch(fetchOrdersFailed(error));
                        });
        }
}

export const purchaseBurger = (orderData) => {
        return dispatch => {
                dispatch(purchaseBurgerStart());
                axios.post('/orders.json', orderData)
                        .then(response => {
                                console.log(response.data);
                                dispatch(purchaseBurgerSuccess(response.data.name, orderData));
                        })
                        .catch(error => {
                                dispatch(purchaseBurgerFailed(error));
                        });
        }

}



// axios.get('/ingredients.json')
        //     .then(response => {
        //         this.setState({ ingredients: response.data });
        //     }).catch(error => {
        //         this.setState({ error: true });
        //     });