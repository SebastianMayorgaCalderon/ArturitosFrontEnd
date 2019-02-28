/* eslint-disable prettier/prettier */
import {
	actionTypes
} from '../actions/starts-actions/starts-actions'

const initialState = {
	pageNum: 0,
	size: 6,
	bodies: [],
	categories: [],
	errorMsj: null,
	waitingForResponse: false,
	totalElements: 0,
	totalPages: 0,
	pageNumber: 0,
	selectedBody: null,
}
const starsReducer = (state = initialState, action) => {
	const { type, payload } = action
	switch (type) {
	case actionTypes.FETCH_ALL_CELESTIAL_BODIES_BY_TYPE:
	case actionTypes.FETCH_ALL_STARS:
	case actionTypes.FETCH_CELESTIAL_BODY:
	case actionTypes.FETCH_ALL_CATEGORIES:
		return {
			...state,
			waitingForResponse: true,
		}
	case actionTypes.FETCH_ALL_STARS_SUCCESS:
	case actionTypes.FETCH_ALL_CELESTIAL_BODIES_BY_TYPE_SUCCESS:
		return {
			...state,
			bodies: payload.content,
			waitingForResponse: false,
			totalElements: payload.totalElements,
			totalPages: payload.totalPages,
			pageNumber: payload.number,
			errorMsj: null
		}
	case actionTypes.FETCH_ALL_CATEGORIES_SUCCESS:
		return {
			...state,
			categories: payload
		}
	case actionTypes.FETCH_CELESTIAL_BODY_SUCCESS:
		return {
			...state,
			selectedBody: payload
		}
	case actionTypes.FETCH_ALL_CELESTIAL_BODIES_BY_TYPE_ERROR:
	case actionTypes.FETCH_ALL_CATEGORIES_ERROR:
	case actionTypes.FETCH_CELESTIAL_BODY_ERROR:
	case actionTypes.FETCH_ALL_STARS_ERROR:
		return {
			...state,
			waitingForResponse: false,
			errorMsj: payload.errorMsj
                }
        case actionTypes.DESELECT_BODY:
                return {
                        ...state,
                        selectedBody:null
                }
	default:
		return { ...state }
	}
}


export default starsReducer