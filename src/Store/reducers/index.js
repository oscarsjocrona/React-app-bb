import { combineReducers } from 'redux';
import burgerBuilderReducer from './burgerBuilder';
import orderReducer from './order';

const rootReducer = combineReducers(
    {
        burgerBuilderReducer: burgerBuilderReducer,
        orderReducer: orderReducer
    });

export default rootReducer;