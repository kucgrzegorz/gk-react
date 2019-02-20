import {	FETCH_ARCADE_BY_ID_SUCCESS,
			FETCH_ARCADE_BY_ID_INIT,
			FETCH_ARCADES_SUCCESS } from '../actions/types';

const INITIAL_STATE = {
	arcades: {
		data: []
	},
	arcade: {
		data: {}
	}
}

export const arcadeReducer = (state = INITIAL_STATE.arcades, action) => {
		switch(action.type) {
			case FETCH_ARCADES_SUCCESS:
				return {...state, data: action.arcades}
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