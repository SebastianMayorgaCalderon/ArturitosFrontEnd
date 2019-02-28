import Axios from 'axios'
import * as firebase from 'firebase/app'
import { BASE_URL } from '../../../constants'
export const actionTypes = {
        LOGIN : 'user/Login',
        LOGIN_SUCCESS : 'user/LOGIN_SUCCESS',
        LOGIN_FALIED : 'user/LOGIN_FALIED',
         REMOVE_ERROR : 'user/REMOVE_ERROR',
         SIGN_UP_SUCCESS : 'user/SIGN_UP_SUCCESS',
        SIGN_UP_ERROR : 'user/SIGN_UP_ERROR',
        REMOVE_SUCCESS_MSJ : 'user/REMOVE_SUCCESS_MSJ',
        SAVE_USER_IMG : 'user/SAVE_USER_IMG',
        SIGN_UP : 'user/SIGN_UP',
        FETCH_CARDS: 'user/FETCH_CARDS',
        FETCH_CARDS_SUCCESS:'user/FETCH_CARDS_SUCCESS',
        FETCH_CARDS_ERROR:'user/FETCH_CARDS_ERROR',
        RESET: '',
        ADD_CARD: 'user/ADD_CARD',
        ADD_CARD_SUCCESS: 'user/ADD_CARD_SUCCESS',
        ADD_CARD_ERROR: 'user/ADD_CARD_ERROR',
        FETCH_USER_BODIES: 'user/FETCH_USER_BODIES',
        FETCH_USER_BODIES_SUCCESS: 'user/FETCH_USER_BODIES_SUCCESS',
        FETCH_USER_BODIES_ERROR: 'user/FETCH_USER_BODIES_ERROR',
        SELL_STAR: 'user/SELL',
        SELL_STAR_SUCCESS: 'user/SELL_STAR_SUCCESS',
        SELL_STAR_ERROR: 'user/SELL_STAR_ERROR',
        REMOVE_CARD: 'user/REMOVE_CARD',
        REMOVE_CARD_SUCCESS:'user/REMOVE_CARD_SUCCESS',
        REMOVE_CARD_ERROR: 'user/REMOVE_CARD_ERROR'
}

const apiUrl = `${BASE_URL}/user`

export const login = credentials => dispatch => {
	dispatch({ type: actionTypes.LOGIN })
	Axios.post(`${apiUrl}/login`, credentials, {
		headers: {
			'Content-Type': 'application/json',
		},
	})
		.then(res => res.data.data)
		.then(data => {
                        dispatch({ type: actionTypes.LOGIN_SUCCESS, payload: data })
                        Axios.get(`${BASE_URL}/card`,{
                                headers:{
                                        'Content-Type': 'application/json',
                                        token:data.token
                                }}
                        ).then(res=>res.data.data).then(cards=>{
                        })
		})
		.catch(err => {
			const objToDispatch = {
				type: actionTypes.LOGIN_FALIED,
				payload: err.response.data.message || 'Something went wrong',
			}
			dispatch(objToDispatch)
		})
}

export const fetchCards = (token) => dispatch => {
        dispatch({type:actionTypes.FETCH_CARDS})
        Axios.get(`${BASE_URL}/card`,{
                headers:{
                        'Content-Type': 'application/json',
                        token
                }}).then(res=>res.data.data).then(data=>{
                
                        dispatch({type: actionTypes.FETCH_CARDS_SUCCESS,payload:data})
        }).catch(err=>{
                dispatch({type:actionTypes.RESET})
        })
}

export const removeError = () => dispatch => {
	dispatch({
		type: actionTypes.REMOVE_ERROR,
	})
}

export const removeSuccess = () => dispatch => {
	dispatch({
		type: actionTypes.REMOVE_SUCCESS_MSJ,
	})
}

export const signUp = user => dispatch => {
	dispatch({ type:actionTypes.SIGN_UP })
	const userToSave = {
		username: user.username,
		password: user.password,
		email: user.email,
	}
	const image = {
		userImgUrl: user.userImgUrl,
	}
	Axios.post(`${apiUrl}`, userToSave, {
		headers: {
			'Content-Type': 'application/json',
		},
	})
		.then(res => res.data.data)
		.then(data => {
			dispatch({ type: actionTypes.SIGN_UP_SUCCESS, payload: data })
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
					`${apiUrl}/uploadImage`,
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
				type: actionTypes.SIGN_UP_ERROR,
				payload: err.response.data.message
					? err.response.data.message
					: err.response.data || 'Something went wrong',
			}
			dispatch(objToDispatch)
		})
}

export const addCard = values => dispatch => {
        const {card, token} = values
        dispatch({type:actionTypes.ADD_CARD})
        Axios.post(`${BASE_URL}/card`,card, {
               headers: {
                        'Content-Type': 'application/json',
                        token: token
                }
        }).then(res=>res.data.data).then(card=>{
                dispatch({type: actionTypes.ADD_CARD_SUCCESS,payload:card})
        }).catch(err=>{
                dispatch({type:actionTypes.ADD_CARD_ERROR})
        })
}

export const removeCard = ({id,token}) => dispatch => {
        dispatch({type:actionTypes.REMOVE_CARD})
        const myApiUrl = `${BASE_URL}/card/${id}`
        Axios.delete(myApiUrl,{
                headers: {
                        'Content-Type': 'application/json',
                        token: token
                }
        }).then(res=>{
                debugger
                return res.data.data
        } ).then(deletedCard=>{
                debugger;
                dispatch({type:actionTypes.REMOVE_CARD_SUCCESS, payload:deletedCard})
                })
        .catch(err=>{
                debugger;
                dispatch({type:actionTypes.REMOVE_CARD_ERROR})
        })
}

export const fetchUserBodies = page => dispatch=> {
        const myApiurl = `${BASE_URL}/product/user-products`
        const { name, pageNum, size, type, token } = page
	const reqUrl = `${myApiurl}${type?`/${type}`:''}?name=${name}&page=${pageNum}&size=${size}`
	dispatch({ type: actionTypes.FETCH_USER_BODIES })
	Axios.get(reqUrl,{
                headers: {
                        'Content-Type': 'application/json',
                        token: token
                }
        }).then(res => res.data.data)
		.then(data => {
			dispatch({ type: actionTypes.FETCH_USER_BODIES_SUCCESS, payload: data })
		}).catch(err => {
			dispatch({ type: actionTypes.FETCH_USER_BODIES_ERROR })
		})
}
export const sellStar = ({id,token})=> dispatch=>{
        dispatch({type:actionTypes.SELL_STAR})
        const myApiUrl = `${BASE_URL}/product/user-products/resell`
        debugger
        Axios.put(myApiUrl,id,{
                headers: {
                        'Content-Type': 'application/json',
                        token
		},
        }).then(res=>res.data.data).then(data=>dispatch({type:actionTypes.SELL_STAR_SUCCESS,payload:data}))
        .catch(err=>dispatch({type:actionTypes.SELL_STAR_ERROR}))
}

