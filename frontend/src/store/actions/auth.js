import * as actionTypes from './actionTypes';
import axios from "axios";

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = (token, is_user_staff) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token: token,
        is_user_staff: is_user_staff
    }
}

export const authFail = error => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}

export const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('is_user_staff');
    localStorage.removeItem('expirationDate');
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const checkAuthTimeout = expirationTime => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000)
    }
}

export const authLogin = (email, password) => {
    return dispatch => {
        dispatch(authStart());
        axios.post('http://127.0.0.1:8000/dj-rest-auth/login/', {
            email: email,
            password: password
        })
        .then(res => {
            const token = res.data.key;
            const is_user_staff = res.data.is_user_staff;
            const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
            localStorage.setItem('token', token);
            localStorage.setItem('is_user_staff', is_user_staff);
            localStorage.setItem('expirationDate', expirationDate);
            dispatch(authSuccess(token, is_user_staff));
            dispatch(checkAuthTimeout(3600));
        })
        .catch(err => {
            console.log(err.response.data);
            dispatch(authFail(err));
        })
    }
}

export const authSignup = (
                            email,
                            password1,
                            password2,
                            username,
                            gender,
                            first_name,
                            last_name,
                            birth_date,
                            location,
                            tel,
                            ) => {
    return dispatch => {
        dispatch(authStart());
        axios.post('http://127.0.0.1:8000/dj-rest-auth/registration/', {
            email: email,
            password1: password1,
            password2: password2,
            username: username,
            gender: gender,
            first_name: first_name,
            last_name: last_name,
            birth_date: birth_date,
            location: location,
            tel: tel,
        })
        .then(res => {
            const token = res.data.key;
            const is_user_staff = res.data.is_user_staff;
            const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
            localStorage.setItem('token', token);
            localStorage.setItem('is_user_staff', is_user_staff);
            localStorage.setItem('expirationDate', expirationDate);
            dispatch(authSuccess(token, is_user_staff));
            dispatch(checkAuthTimeout(3600));
        })
        .catch(err => {
            dispatch(authFail(err));
            console.log(err.response.data);
        })
    }
}

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (token === undefined) {
            dispatch(logout());
        }
        else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if (expirationDate <= new Date()) {
                dispatch(logout());
            }
            else {
                const is_user_staff = localStorage.getItem('is_user_staff');
                dispatch(authSuccess(token, is_user_staff));
                dispatch( checkAuthTimeout(expirationDate.getTime() - new Date().getTime() / 1000) );
            }
        }
    }
}
