import axios from 'axios';

import {FETCH_ARCADE_BY_ID_SUCCESS, 
        FETCH_ARCADE_BY_ID_INIT,
        FETCH_ARCADES_SUCCESS } from './types';

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

        axios.get('/api/v1/arcades')
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