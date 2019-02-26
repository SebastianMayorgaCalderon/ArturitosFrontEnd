/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react'
import { Route, Switch, withRouter } from 'react-router-dom'

import './App.scss'
import { connect } from 'react-redux'
import Popup from 'reactjs-popup'
import LoginView from './views/login/login'
import SignUpView from './views/sign-up/sign-up'
import { login } from './store/actions/user-actions/user-actions'
import BurgerIcon from './components/BurgerIcon/BurgerIcon'
import Menu from './components/Menu/Menu'
import HomeView from './views/home/home'
import CelestialBodyDetailsView from './views/celestial-body-type/celestial-body'
import CartView from './views/cart/cart'

const contentStyle = {
	background: 'rgba(255,255,255,0)',
	width: '100%',
	border: 'none',
}

class App extends Component {
	render() {
		return (
			<div className="container">
				<div className="full-page__container">
					<Switch>
						<Route path="/login" component={LoginView} />
						<Route path="/sign-up" component={SignUpView} />
						<Route path="/home/:id" component={CelestialBodyDetailsView} />
						<Route path="/home" component={HomeView} />
						<Route path="/my-cart" component={CartView} />
					</Switch>
					<Popup
						modal
						overlayStyle={{ background: '#FFFFFF99' }}
						contentStyle={contentStyle}
						closeOnDocumentClick
						trigger={open => (
							<BurgerIcon open={open} style={{ right: '2rem' }} />
						)}
					>
						{close => <Menu close={close} />}
					</Popup>
				</div>
			</div>
		)
	}
}

const mapStateToProps = ({ userReducer }) => ({
	username: userReducer.userName,
	token: userReducer.token,
	email: userReducer.email,
})
const mapDispatchToProps = dispatch => ({
	onLogin: credentials => dispatch(login(credentials)),
})
export default withRouter(
	connect(
		mapStateToProps,
		mapDispatchToProps
	)(App)
)
