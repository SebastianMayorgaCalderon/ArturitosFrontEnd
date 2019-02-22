/* eslint-disable indent */
/* eslint-disable default-case */
import {
	LOGIN_FALIED,
	LOGIN,
	LOGIN_SUCCESS,
	REMOVE_ERROR,
	SIGN_UP,
	SAVE_USER_IMG,
	SIGN_UP_SUCCESS,
	SIGN_UP_ERROR,
	REMOVE_SUCCESS_MSJ,
} from '../actions/user-actions/user-actions'

const initialState = {
	username: null,
	email: null,
	token: null,
	waitingForResponce: false,
	errorMsj: null,
	suceedMessage: null,
}
const userReducer = (state = initialState, action) => {
	const { payload, type } = action
	switch (type) {
		case LOGIN:
		case SIGN_UP:
			return {
				...state,
				errorMsj: null,
				waitingForResponce: true,
			}
		case LOGIN_SUCCESS:
			return {
				...state,
				waitingForResponce: false,
				username: payload.username,
				email: payload.email,
				token: payload.token,
				errorMsj: null,
			}
		case LOGIN_FALIED:
		case SIGN_UP_ERROR:
			return {
				...state,
				waitingForResponce: false,
				errorMsj: payload,
			}
		case SIGN_UP_SUCCESS:
			return {
				...state,
				suceedMessage: 'User Crerated!',
				waitingForResponce: false,
				errorMsj: null,
			}
		case REMOVE_ERROR:
			return {
				...state,
				errorMsj: null,
			}
		case REMOVE_SUCCESS_MSJ:
			return {
				...state,
				suceedMessage: null,
			}
		default:
			return { ...state }
	}
}

export default userReducer
