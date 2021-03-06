import React from 'react'
import ReactDOM from 'react-dom'

import * as ReactRedux from 'react-redux'
import * as firebase from 'firebase'

import { HashRouter, Switch } from 'react-router-dom'

import './index.scss'
import App from './App'
import * as serviceWorker from './serviceWorker'
import configureStore from './store/configureStore'

const store = configureStore()

const config = {
	apiKey: 'AIzaSyAoUDvzt4AWXocgmBjIlaaHMTDUjpUsoU0',
	authDomain: 'r2dtos.firebaseapp.com',
	databaseURL: 'https://r2dtos.firebaseio.com',
	projectId: 'r2dtos',
	storageBucket: 'r2dtos.appspot.com',
	messagingSenderId: '81674697061',
}

firebase.initializeApp(config)

ReactDOM.render(
	<HashRouter>
		<Switch>
			<ReactRedux.Provider store={store}>
				<App />
			</ReactRedux.Provider>
		</Switch>
	</HashRouter>,
	document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()
