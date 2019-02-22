/* eslint-disable prettier/prettier */
import {
	FETCH_ALL_CONSTELLATIONS,
	FETCH_ALL_STARS,
	FETCH_ALL_CONSTELLATIONS_ERROR,
	FETCH_ALL_CONSTELLATIONS_SUCCESS,
	FETCH_ALL_STARS_ERROR,
	FETCH_ALL_STARS_SUCCESS,
	FETCH_CELESTIAL_BODY,
	FETCH_CELESTIAL_BODY_ERROR,
	FETCH_CELESTIAL_BODY_SUCCESS
} from '../actions/starts-actions/starts-actions'

const initialState = {
	pageNum: 0,
	size: 11,
	bodys: [],
	errorMsj: null,
	waitingForResponse: false,
	totalElements: 0,
	totalPages: 0,
	pageNumber: 0,
	selectedBody:null,
}
const starsReducer = (state = initialState, action) => {
	const { type, payload } = action
	switch (type) {
	case FETCH_ALL_CONSTELLATIONS:
	case FETCH_ALL_STARS:
	case FETCH_CELESTIAL_BODY:
		return {
			...state,
			waitingForResponse: true,
		}
	case FETCH_ALL_CONSTELLATIONS_SUCCESS:
	case FETCH_ALL_STARS_SUCCESS:
		return {
			...state,
			bodys: payload.content,
			waitingForResponse: false,
			totalElements: payload.totalElements,
			totalPages:payload.totalPages,
			pageNumber: payload.number,
			errorMsj:null
		}
	case FETCH_CELESTIAL_BODY_SUCCESS:
		return {
			...state,
			selectedBody: payload
		}
	
	case FETCH_CELESTIAL_BODY_ERROR:
	case FETCH_ALL_CONSTELLATIONS_ERROR:
	case FETCH_ALL_STARS_ERROR:
		return {
			...state,
			waitingForResponse: false,
			errorMsj: payload.errorMsj
		}
	default:
		return { ...state }
	}
}


export default starsReducer