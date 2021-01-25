import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
}

export const authSuccess = (authData) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        authData: authData
    };
}

export const authFailed = (error) => {
    return {
        type: actionTypes.AUTH_FAILED,
        error: error
    };
}

export const authenticate = (email, password, isSignUp) => {
    const signUp = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAxvBXmfCALgGC6uoUemaWNfrHMSqu_IWc';
    const signIn = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAxvBXmfCALgGC6uoUemaWNfrHMSqu_IWc';
    return dispatch => {
        dispatch(authStart());
        const payload = {
            email: email,
            password: password, 
            returnsSecureToken: true
        };
        const url = isSignUp ? signUp : signIn;
        axios.post(url, payload).then(response => {
            console.log(response);
            dispatch(authSuccess(response.data));
        })
        .catch(error => {
            console.log(error);
            dispatch(authFailed(error));
        });
    };
} 