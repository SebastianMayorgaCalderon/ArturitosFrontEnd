/* eslint-disable indent */
/* eslint-disable no-unused-expressions */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/display-name */
import React from 'react'
import './Menu.scss'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import { logout } from '../../store/actions';

const optsForOutsideUsers = [
        {
                path: '/login',
                label: 'Login',
        },
        {
                path: '/sign-up',
                label: 'Sign up',
        },
]
const optForLoggedUsers = [
        {
                path: '/my-profile',
                label: 'My collection',
        },
]
const Menu = ({ close, token, history, onLogout }) => {
        const menuAltOpts = token ? optForLoggedUsers : optsForOutsideUsers
        return (
                <div className="menu">
                        <ul>
                                <li onClick={close} className="grow-efect">
                                        <Link to="/stars">R2DT0S</Link>
                                </li>
                                <li onClick={close} className="grow-efect">
                                        <Link to="/home">Stars</Link>
                                </li>
                                <li onClick={close} className="grow-efect">
                                        <Link to="/my-cart">Cart</Link>
                                </li>
                                {menuAltOpts.map((route, i) => (
                                        <li
                                                onClick={close}
                                                key={`${route.label}-${i}`}
                                                className="grow-efect"
                                        >
                                                <Link to={route.path}>{route.label}</Link>
                                        </li>
                                ))}
                                {token ?
                                        <li onClick={() => {
                                                onLogout();
                                                history.push('/home')
                                                close();
                                        }}
                                        className="grow-efect">Log out</li> : null
                                }
                        </ul>
                </div>
        )
}
const mapStateToProps = ({ userReducer }) => ({
        token: userReducer.token,
})
const mapDispatchToProps = dispatch => ({
        onLogout: () => dispatch(logout())
})

export default withRouter(
        connect(
                mapStateToProps,
                mapDispatchToProps
        )(Menu)
)
