import Axios from 'axios'
import { BASE_URL } from '../../../constants'

export const FETCH_ALL_STARS = 'stars/FETCH_ALL_STARS'
export const FETCH_ALL_CONSTELLATIONS = 'stars/FETCH_ALL_CONSTELLATIONS'

export const FETCH_ALL_STARS_SUCCESS = 'stars/FETCH_ALL_STARS_SUCCESS'
export const FETCH_ALL_CONSTELLATIONS_SUCCESS =
	'stars/FETCH_ALL_CONSTELLATIONS_SUCCESS'

export const FETCH_ALL_STARS_ERROR = 'stars/FETCH_ALL_STARS_ERROR'
export const FETCH_ALL_CONSTELLATIONS_ERROR =
	'stars/FETCH_ALL_CONSTELLATIONS_ERROR'
const apiUrl = `${BASE_URL}/product`

export const FETCH_CELESTIAL_BODY = 'stars/FETCH_CELESTIAL_BODY'
export const FETCH_CELESTIAL_BODY_SUCCESS = 'stars/FETCH_CELESTIAL_BODY_SUCCESS'
export const FETCH_CELESTIAL_BODY_ERROR = 'stars/FETCH_CELESTIAL_BODY_ERROR'

export const fetchAllStarts = page => dispatch => {
	dispatch({ type: FETCH_ALL_STARS })
	const reqUrl = `${apiUrl}?page=${page.pageNum}&size=${page.size}`
	Axios.get(reqUrl, {
		headers: {
			'Content-Type': 'application/json',
		},
	})
		.then(res => res.data.data)
		.then(revidePage => {
			dispatch({ type: FETCH_ALL_STARS_SUCCESS, payload: revidePage })
		})
		.catch(err => {
			const objToDispose = {
				errorMsj: 'idk fam',
			}
			dispatch({ type: FETCH_ALL_STARS_ERROR, payload: objToDispose })
		})
}

export const fetchAllConstallations = page => dispatch => {
	dispatch({ type: FETCH_ALL_CONSTELLATIONS })
	const reqUrl = `${apiUrl}?page=${page.pageNum}&size=${page.size} }`
	Axios.get(reqUrl, {
		headers: {
			'Content-Type': 'application/json',
		},
	})
		.then(res => res.data)
		.then(revidePage => {
			dispatch({ type: FETCH_ALL_CONSTELLATIONS_SUCCESS, payload: revidePage })
		})
		.catch(err => {
			const objToDispose = {
				errorMsj: 'idk fam',
			}

			dispatch({ type: FETCH_ALL_CONSTELLATIONS_ERROR, objToDispose })
		})
}

export const fetchCelestialBody = id => dispatch => {
	dispatch({ type: FETCH_CELESTIAL_BODY })
	Axios.get(`${apiUrl}/${id}`, {
		headers: {
			'Content-Type': 'application/json',
		},
	})
		.then(res => res.data.data)
		.then(data => {
			dispatch({ type: FETCH_CELESTIAL_BODY_SUCCESS, payload: data })
		})
		.catch(err => {
			debugger
			dispatch({ type: FETCH_CELESTIAL_BODY_ERROR, payload: err.data })
		})
}
