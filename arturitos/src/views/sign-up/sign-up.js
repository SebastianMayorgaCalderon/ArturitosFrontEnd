/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import Card from '../../components/Card/Card'
import Input from '../../components/Input/Input'
import Warning from '../../components/Warning/Warning'
import MyButton from '../../components/MyButton/MyButton'
import Spinner from '../../components/Spinner/Spinner'
import { signUp, removeError, removeSuccess } from '../../store/actions/index'

import './sign-up.scss'

class SignUpView extends Component {
	state = {
		userImg: null,
		username: '',
		password: '',
		email: '',
		confirmPassword: '',
		usernameFieldActive: false,
		passwordFieldActive: false,
		emailFieldActive: false,
		confirmPasswordFieldActive: false,
		hideWarning: false,
	}

	onImageChange = image => {
		this.setState({ userImg: image })
	}

	resetForm = () => {
		this.setState({
			userImg: null,
			username: '',
			password: '',
			email: '',
			confirmPassword: '',
			usernameFieldActive: false,
			passwordFieldActive: false,
			emailFieldActive: false,
			confirmPasswordFieldActive: false,
		})
	}

	showErrorHandler = () => {
		this.resetForm()
		setTimeout(() => {
			this.props.onRemoveErrorMsj()
			this.props.onRemoveSuccessMsj()
			this.setState({ hideWarning: false })
		}, 1000)
	}

	onCreateUser = () => {
		const { username, password, email, userImg } = this.state
		const user = {
			username,
			password,
			email,
			userImgUrl: userImg,
		}
		this.props.onSignUp(user)
		this.resetForm()
	}

	validateFields = () => {
		const {
			username,
			password,			
			email,
			confirmPassword,
		} = this.state
		return (username !== '' && password !=='' && email!== '' && confirmPassword!=='' && this.validateEmailField(email) && password.length>=6)
	}

	validateEmailField = email => {
		const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
		return re.test(String(email).toLowerCase())
	}

	render() {
		const {
			username,
			password,
			usernameFieldActive,
			passwordFieldActive,
			email,
			confirmPassword,
			emailFieldActive,
			confirmPasswordFieldActive,
			hideWarning,
		} = this.state
		const { error, waitingForResponce, suceedMessage } = this.props
		const { userImg } = this.state
		const imageToShow = userImg
			? URL.createObjectURL(userImg)
			: 'https://openclipart.org/download/247319/abstract-user-flat-3.svg'
		return (
			<div className="sign-up-container__view">
				<Card>
					<div className="sign-up__wrapper">
						<h1 className="sign-up__title">SignUp</h1>
						{waitingForResponce ? (
							<Spinner />
						) : (
							<div className="sign-up__form">
								<div className="image_controller">
									<img className="userAvatar" src={imageToShow} alt="avatar" />
									<div className="file-input-wrapper">
										<button className="btn-file-input" type="button">
											User image
										</button>
										<input
											type="file"
											name="file"
											onChange={ev => this.onImageChange(ev.target.files[0])}
										/>
									</div>
								</div>
								<div className="sign-up__form__controller__wrapper">
									<div className="field-container">
										<Input
											type="text"
											label="Username"
											error={username === '' ? 'Username Required' : null}
											onChange={val => this.setState({ username: val })}
											value={username}
											active={usernameFieldActive}
											changeFieldStatus={status =>
												this.setState({ usernameFieldActive: status })
											}
											locked={false}
										/>
									</div>
									<div className="field-container">
										<Input
											type="text"
											label="Email"
											onChange={val => this.setState({ email: val })}
											value={email}
											error={
												email === ''
													? 'Email Required'
													: !this.validateEmailField(email)
														? 'Incorrect Email'
														: null
											}
											active={emailFieldActive}
											changeFieldStatus={status =>
												this.setState({ emailFieldActive: status })
											}
											locked={false}
										/>
									</div>
								</div>
								<div className="sign-up__form__controller__wrapper">
									<div className="field-container">
										<Input
											type="password"
											label="Password"
											onChange={val => this.setState({ password: val })}
											value={password}
											error={
												password === ''
													? 'Password Required'
													: password.length < 6
														? 'Password too short'
														: null
											}
											active={passwordFieldActive}
											changeFieldStatus={status =>
												this.setState({ passwordFieldActive: status })
											}
											locked={false}
										/>
									</div>
									<div className="field-container">
										<Input
											type="password"
											label="Confirm password"
											onChange={val => this.setState({ confirmPassword: val })}
											value={confirmPassword}
											error={confirmPassword!== password? 'Password does not match':null}
											active={confirmPasswordFieldActive}
											changeFieldStatus={status =>
												this.setState({ confirmPasswordFieldActive: status })
											}
											locked={false}
										/>
									</div>
								</div>
							</div>
						)}

						<div className="sign-up__button__wrapper">
							<MyButton
								label="Sign Up"
								onExecFunc={this.onCreateUser}
								canClick={this.validateFields()}
							/>
							{error ? (
								<Warning
									type="error"
									toHide={hideWarning}
									dissmiss={this.showErrorHandler}
									message={error}
								/>
							) : null}
							{suceedMessage ? (
								<Warning
									type="success"
									toHide={hideWarning}
									dissmiss={this.showErrorHandler}
									message={suceedMessage}
								/>
							) : null}
						</div>
					</div>
				</Card>
			</div>
		)
	}
}
const mapStateToProps = ({ userReducer }) => ({
	username: userReducer.userName,
	token: userReducer.token,
	email: userReducer.email,
	waitingForResponce: userReducer.waitingForResponce,
	error: userReducer.errorMsj,
	suceedMessage: userReducer.suceedMessage,
})
const mapDispatchToProps = dispatch => ({
	onSignUp: user => dispatch(signUp(user)),
	onRemoveErrorMsj: () => dispatch(removeError()),
	onRemoveSuccessMsj: () => dispatch(removeSuccess()),
})
export default withRouter(
	connect(
		mapStateToProps,
		mapDispatchToProps
	)(SignUpView)
)
