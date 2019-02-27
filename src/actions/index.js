import axios from 'axios';
import authService from 'services/auth-service';
import axiosService from 'services/axios-service';

import {FETCH_ARCADE_BY_ID_SUCCESS, 
        FETCH_ARCADE_BY_ID_INIT,
        FETCH_ARCADES_SUCCESS, 
        LOGIN_SUCCESS, 
        LOGIN_FAILURE,
        LOGOUT } from './types';

// ARCADES ACTIONS -------------

    const axiosInstance = axiosService.getInstance();


    const fetchArcadeByIdInit = () => {

    return{
        type: FETCH_ARCADE_BY_ID_INIT
    }
}

const fetchArcadeByIdSuccess = (arcade) => {
    return {
        type: FETCH_ARCADE_BY_ID_SUCCESS,
        arcade
    }
}

const fetchArcadesSuccess = (arcades) => {
    return {
        type: FETCH_ARCADES_SUCCESS,
        arcades
    }
}

export const fetchArcades = () => {
    return dispatch => {
        axiosInstance.get('/arcades')
        .then(res => res.data )
        .then(arcades => dispatch(fetchArcadesSuccess(arcades))
        );
    }
}
	
export const fetchArcadeById = (arcadeId) => {
 return function(dispatch){
        dispatch(fetchArcadeByIdInit());

        axios.get(`/api/v1/arcades/${arcadeId}`)
        .then(res => res.data )
        .then(arcade => dispatch(fetchArcadeByIdSuccess(arcade))
        );
    }
}

// AUTH ACTIONS --------------------------
export const register = (userData) => {
    return axios.post('/api/v1/users/register', {...userData}).then(
        res => res.data,
        err => Promise.reject(err.response.data.errors)
    )
}

const loginSuccess = () => {
    return {
        type: LOGIN_SUCCESS,
     }
}

const loginFailure = (errors) => {
    return {
        type: LOGIN_FAILURE,
        errors
    }
}

export const checkAuthState = () => {
    return dispatch => {
        if (authService.isAuthenticated()) {
            dispatch(loginSuccess());
        }
    }
}

export const login = (userData) => {
    return dispatch => {
        return axios.post('/api/v1/users/auth', {...userData})
        .then(res => res.data)
        .then(token => {
            authService.saveToken(token);
            dispatch(loginSuccess());
        })
        .catch(({response}) => {
            dispatch(loginFailure(response.data.errors));
        })
    }
}

export const logout = () => {
    authService.invalidateUser();

    return {
        type: LOGOUT
    }
}