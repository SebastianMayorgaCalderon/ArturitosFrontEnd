/* eslint-disable prettier/prettier */
import Axios from 'axios'
import { BASE_URL } from '../../../constants'

export const actionTypes = {
	FETCH_ALL_STARS: 'stars/FETCH_ALL_STARS',
	FETCH_ALL_STARS_ERROR: 'stars/FETCH_ALL_STARS_ERROR',
	FETCH_ALL_STARS_SUCCESS: 'stars/FETCH_ALL_STARS_SUCCESS',
	FETCH_CELESTIAL_BODY: 'stars/FETCH_CELESTIAL_BODY',
	FETCH_CELESTIAL_BODY_SUCCESS: 'stars/FETCH_CELESTIAL_BODY_SUCCESS',
	FETCH_CELESTIAL_BODY_ERROR: 'stars/FETCH_CELESTIAL_BODY_ERROR',
	FETCH_ALL_CATEGORIES: 'stars/FETCH_ALL_CATEGORIES',
	FETCH_ALL_CATEGORIES_SUCCESS: 'stars/FETCH_ALL_CATEGORIES_SUCCESS',
	FETCH_ALL_CATEGORIES_ERROR: 'stars/FETCH_ALL_CATEGORIES_ERROR',
	FETCH_ALL_CELESTIAL_BODIES_BY_TYPE: 'stars/FETCH_ALL_CELESTIAL_BODYS_BY_TYPE',
	FETCH_ALL_CELESTIAL_BODIES_BY_TYPE_SUCCESS: 'stars/FETCH_ALL_CELESTIAL_BODYS_BY_TYPE_SUCCESS',
	FETCH_ALL_CELESTIAL_BODIES_BY_TYPE_ERROR: 'stars/FETCH_ALL_CELESTIAL_BODYS_BY_TYPE_ERROR',
	FETCH_ALL_CELESITIAL_BODIES_BY_NAME: 'stars/FETCH_ALL_CELESITIAL_BODIES_BY_NAME',
	FETCH_ALL_CELESITIAL_BODIES_BY_NAME_SUCCESS: 'star/FETCH_ALL_CELESITIAL_BODIES_BY_NAME_SUCCESS',
	FETCH_ALL_CELESITIAL_BODIES_BY_NAME_ERROR: 'star/FETCH_ALL_CELESITIAL_BODIES_BY_NAME_ERROR'
}

const apiUrl = `${BASE_URL}/product`

export const fetchAllStars = page => dispatch => {
	dispatch({ type: actionTypes.FETCH_ALL_STARS })
	const { name, pageNum, size } = page
	const reqUrl = `${apiUrl}?name=${name}&page=${pageNum}&size=${size}`
	Axios.get(reqUrl, {
		headers: {
			'Content-Type': 'application/json',
		},
	})
		.then(res => res.data.data)
		.then(revidePage => {
			dispatch({ type: actionTypes.FETCH_ALL_STARS_SUCCESS, payload: revidePage })
		})
		.catch(err => {
			const objToDispose = {
				errorMsj: 'idk fam',
			}
			dispatch({ type: actionTypes.FETCH_ALL_STARS_ERROR, payload: objToDispose })
		})
}

export const fetchCelestialBody = id => dispatch => {
	dispatch({ type: actionTypes.FETCH_CELESTIAL_BODY })
	Axios.get(`${apiUrl}/${id}`, {
		headers: {
			'Content-Type': 'application/json',
		},
	})
		.then(res => res.data.data)
		.then(data => {
			dispatch({ type: actionTypes.FETCH_CELESTIAL_BODY_SUCCESS, payload: data })
		})
		.catch(err => {
			dispatch({ type: actionTypes.FETCH_CELESTIAL_BODY_ERROR, payload: err.data })
		})
}

export const fetchAllCategories = () => dispatch => {
	dispatch({ type: actionTypes.FETCH_ALL_CATEGORIES })
	Axios.get(`${BASE_URL}/category`).then(res => res.data.data).
		then(data => {
			dispatch({ type: actionTypes.FETCH_ALL_CATEGORIES_SUCCESS, payload: data })
		}).catch(err => {
			dispatch({ type: actionTypes.FETCH_ALL_CATEGORIES_ERROR, payload: err })
		})
}

export const fetchAllCelesialBodiesByType = page => dispatch => {
	const { name, pageNum, size, type } = page
	const reqUrl = `${apiUrl}/category/${type}?name=${name}&page=${pageNum}&size=${size}`
	dispatch({ type: actionTypes.FETCH_ALL_CELESTIAL_BODIES_BY_TYPE })
	Axios.get(reqUrl).then(res => res.data.data).
		then(data => {
			dispatch({ type: actionTypes.FETCH_ALL_CELESTIAL_BODIES_BY_TYPE_SUCCESS, payload: data })
		}).catch(err => {
			dispatch({ type: actionTypes.FETCH_ALL_CELESTIAL_BODIES_BY_TYPE_ERROR, payload: err.data.data })
		})
}

