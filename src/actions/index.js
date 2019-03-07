import axios from 'axios';
import authService from 'services/auth-service';
import axiosService from 'services/axios-service';

import {FETCH_ARCADE_BY_ID_SUCCESS, 
        FETCH_ARCADE_BY_ID_INIT,
        FETCH_ARCADES_SUCCESS, 
        FETCH_ARCADES_INIT,
        FETCH_ARCADES_FAIL,
        LOGIN_SUCCESS, 
        LOGIN_FAILURE,
        LOGOUT,
        FETCH_USER_BOOKINGS_SUCCESS,
        FETCH_USER_BOOKINGS_FAIL,
        FETCH_USER_BOOKINGS_INIT } from './types';

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

const fetchArcadesInit = () => {
    return {
        type: FETCH_ARCADES_INIT
    }
}

const fetchArcadesFail = (errors) => {
    return {
        type: FETCH_ARCADES_FAIL,
        errors
    }
}

const fetchArcadesSuccess = (arcades) => {
    return {
        type: FETCH_ARCADES_SUCCESS,
        arcades
    }
}

export const fetchArcades = (city) => {
    const url = city ? `/arcades?city=${city}` : '/arcades';

    return dispatch => {
        dispatch(fetchArcadesInit());

      axiosInstance.get(url)
        .then(res => res.data )
        .then(arcades => dispatch(fetchArcadesSuccess(arcades)))
        .catch(({response}) => dispatch(fetchArcadesFail(response.data.errors)))
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

export const createArcade = (arcadeData) => {
    return axiosInstance.post('/arcades', arcadeData).then(
        res => res.data,
        err => Promise.reject(err.response.data.errors)
    )
}

// USER BOOKINGS ACTIONS -------------------------------------

const fetchUserBookingsInit = () => {
    return {
        type: FETCH_USER_BOOKINGS_INIT
    }
}

const fetchUserBookingsSuccess = (userBookings) => {
    return {
        type: FETCH_USER_BOOKINGS_SUCCESS,
        userBookings
    }
}

const fetchUserBookingsFail = (errors) => {
    return {
        type: FETCH_USER_BOOKINGS_FAIL,
        errors
    }
}

export const fetchUserBookings = () => {
    return dispatch => {
        dispatch(fetchUserBookingsInit());

        axiosInstance.get('/bookings/manage')
        .then(res => res.data )
        .then(userBookings => dispatch(fetchUserBookingsSuccess(userBookings)))
        .catch(({response}) => dispatch(fetchUserBookingsFail(response.data.errors)))

    }
}

// USER ARCADES ACTIONS -------------------------------------

export const getUserArcades = () => {
    return axiosInstance.get('/arcades/manage').then(
        res => res.data,
        err => Promise.reject(err.response.data.errors)
    )
}

export const deleteArcade = (arcadeId) => {
    return axiosInstance.delete(`/arcades/${arcadeId}`).then(
        res => res.data,
        err => Promise.reject(err.response.data.errors))
}

// AUTH ACTIONS -------------------------- akcje typu tworzenie salonu
export const register = (userData) => {
    return axios.post('/api/v1/users/register', userData).then(
        res => res.data,
        err => Promise.reject(err.response.data.errors)
    )
}

const loginSuccess = () => {
    const username = authService.getUsername();

    return {
        type: LOGIN_SUCCESS,
        username
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
        return axios.post('/api/v1/users/auth', userData)
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

export const createBooking = (booking) => {
    return axiosInstance.post('/bookings', booking)
        .then(res => res.data)
        .catch(({response}) => Promise.reject(response.data.errors))
}