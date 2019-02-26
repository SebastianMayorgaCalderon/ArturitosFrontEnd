import Axios from 'axios'
import * as firebase from 'firebase/app'
import { BASE_URL } from '../../../constants'

export const LOGIN = 'user/Login'
export const LOGIN_SUCCESS = 'user/LOGIN_SUCCESS'
export const LOGIN_FALIED = 'user/LOGIN_FALIED'
export const REMOVE_ERROR = 'user/REMOVE_ERROR'

export const SIGN_UP = 'user/SIGN_UP'
export const SIGN_UP_SUCCESS = 'user/SIGN_UP_SUCCESS'
export const SIGN_UP_ERROR = 'user/SIGN_UP_ERROR'
export const REMOVE_SUCCESS_MSJ = 'user/REMOVE_SUCCESS_MSJ'

export const SAVE_USER_IMG = 'user/SAVE_USER_IMG'

export const login = credentials => dispatch => {
	dispatch({ type: LOGIN })
	Axios.post(`${BASE_URL}/user/login`, credentials, {
		headers: {
			'Content-Type': 'application/json',
		},
	})
		.then(res => res.data.data)
		.then(data => {
			dispatch({ type: LOGIN_SUCCESS, payload: data })
		})
		.catch(err => {
			const objToDispatch = {
				type: LOGIN_FALIED,
				payload: err.response.data.message || 'Something went wrong',
			}
			dispatch(objToDispatch)
		})
}

export const removeError = () => dispatch => {
	dispatch({
		type: REMOVE_ERROR,
	})
}

export const removeSuccess = () => dispatch => {
	dispatch({
		type: REMOVE_SUCCESS_MSJ,
	})
}

export const signUp = user => dispatch => {
	dispatch({ type: SIGN_UP })
	const userToSave = {
		username: user.username,
		password: user.password,
		email: user.email,
	}
	const image = {
		userImgUrl: user.userImgUrl,
	}
	Axios.post(`${BASE_URL}/user`, userToSave, {
		headers: {
			'Content-Type': 'application/json',
		},
	})
		.then(res => res.data.data)
		.then(data => {
			dispatch({ type: SIGN_UP_SUCCESS, payload: data })
			if (user.userImgUrl) {
				const storageRef = firebase
					.storage()
					.ref(`/images/${image.userImgUrl.name}`)
				storageRef.put(image.userImgUrl).then(any => {
					firebase
						.storage()
						.ref(`/images`)
						.child(image.userImgUrl.name)
						.getDownloadURL()
						.then(imagepath => {
							Axios.post(
								`${BASE_URL}/user/uploadImage`,
								{
									userImgUrl: imagepath,
									username: user.username,
									password: user.password,
									email: user.email,
								},
								{
									headers: {
										'Content-Type': 'application/json',
										token: data.token,
									},
								}
							).then(succed => {})
						})
				})
			} else {
				debugger
				Axios.post(
					`${BASE_URL}/user/uploadImage`,
					{
						userImgUrl:
							'https://openclipart.org/download/247319/abstract-user-flat-3.svg',
						username: user.username,
						email: user.email,
					},
					{
						headers: {
							'Content-Type': 'application/json',
						},
					}
				).then(succed => {})
			}
		})
		.catch(err => {
			const objToDispatch = {
				type: SIGN_UP_ERROR,
				payload: err.response.data.message
					? err.response.data.message
					: err.response.data || 'Something went wrong',
			}
			dispatch(objToDispatch)
		})
}
