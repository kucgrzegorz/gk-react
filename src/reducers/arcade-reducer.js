import {	FETCH_ARCADE_BY_ID_SUCCESS,
			FETCH_ARCADE_BY_ID_INIT,
			FETCH_ARCADES_SUCCESS, 
			FETCH_ARCADES_INIT, 
			FETCH_ARCADES_FAIL } from '../actions/types';

const INITIAL_STATE = {
	arcades: {
		data: [],
		errors: []
	},
	arcade: {
		data: {}
	}
}

export const arcadeReducer = (state = INITIAL_STATE.arcades, action) => {
		switch(action.type) {
			case FETCH_ARCADES_INIT:
				return {...state, data: [], errors: []};
			case FETCH_ARCADES_SUCCESS:
				return {...state, data: action.arcades};
			case FETCH_ARCADES_FAIL:
				return Object.assign({}, state, {errors: action.errors, data: []});
			default:
				return state;
		}
	}

	export const selectedArcadeReducer = (state = INITIAL_STATE.arcade, action) => {
		switch(action.type) {
			case FETCH_ARCADE_BY_ID_INIT:
				return {...state, data: {}};
			case FETCH_ARCADE_BY_ID_SUCCESS:
				return {...state, data: action.arcade}
			default:
				return state;
		}

	}