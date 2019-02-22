import { createStore, combineReducers, compose, applyMiddleware } from 'redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import userReducer from './reducers/userReducer'
import starsReducer from './reducers/starReducer'

const middlewares = applyMiddleware(thunk, logger)
const rootReducer = combineReducers({
	userReducer,
	starsReducer,
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const configureStore = () =>
	createStore(rootReducer, composeEnhancers(middlewares))

export default configureStore
