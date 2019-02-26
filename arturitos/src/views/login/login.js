/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import Card from '../../components/Card/Card'
import Input from '../../components/Input/Input'
import { login, removeError, removeSuccess } from '../../store/actions/index'
import './login.scss'
import MyButton from '../../components/MyButton/MyButton'
import Spinner from '../../components/Spinner/Spinner'
import Warning from '../../components/Warning/Warning'

class LoginView extends Component {
  state = {
    username: '',
    password: '',
    usernameFieldActive: false,
    passwordFieldActive: false,
    hideWarning: false,
  }

  componentDidMount() {
    this.setState({
      username: '',
      password: '',
      usernameFieldActive: false,
      passwordFieldActive: false,
      hideWarning: false,
    })
    const { token, history } = this.props
    if (token) {
      history.push('/home')
    }
  }

  componentDidUpdate() {
    const { token, history, currentOrderProducts } = this.props
    if (token) {
      currentOrderProducts.length !== 0 ? history.push('/my-cart') : history.push('/home')
    }
  }

  onLoginHandler = () => {
    const { username, password } = this.state
    this.props.onLogin({ username, password })
  }

  showErrorHandler = () => {
    this.setState({
      username: '',
      password: '',
      usernameFieldActive: false,
      passwordFieldActive: false,
      hideWarning: true,
    })
    setTimeout(() => {
      this.props.onRemoveErrorMsj()
      this.props.onRemoveSuccessMsj()
      this.setState({ hideWarning: false })
    }, 1000)
  }

  render() {
    const {
      username,
      password,
      usernameFieldActive,
      passwordFieldActive,
      hideWarning,
    } = this.state
    const { waitingForResponce, error } = this.props
    return (
      <div className="login-container-view">
        <Card>
          <div className="login-wrapper">
            <h1 className="login-title">Login</h1>
            {waitingForResponce ? (
              <Spinner />
            ) : (
                <div>
                  <div className="login-container">
                    <div className="field-container">
                      <Input
                        type="text"
                        label="UserName"
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
                        type="password"
                        label="Password"
                        onChange={val => this.setState({ password: val })}
                        value={password}
                        active={passwordFieldActive}
                        changeFieldStatus={status =>
                          this.setState({ passwordFieldActive: status })
                        }
                        locked={false}
                      />
                    </div>
                  </div>
                  <div className="button-wrapper">
                    <MyButton
                      label="Login"
                      onExecFunc={this.onLoginHandler}
                      canClick={username !== '' && password !== ''}
                    />
                    {error ? (
                      <Warning
                        type="error"
                        toHide={hideWarning}
                        dissmiss={this.showErrorHandler}
                        message={error}
                      />
                    ) : null}
                  </div>
                </div>
              )}
          </div>
        </Card>
      </div>
    )
  }
}

const mapStateToProps = ({ userReducer, cartReducer }) => ({
  username: userReducer.userName,
  token: userReducer.token,
  email: userReducer.email,
  waitingForResponce: userReducer.waitingForResponce,
  error: userReducer.errorMsj,
  currentOrderProducts: cartReducer.currentOrderProducts
})
const mapDispatchToProps = dispatch => ({
  onLogin: credentials => dispatch(login(credentials)),
  onRemoveErrorMsj: () => dispatch(removeError()),
  onRemoveSuccessMsj: () => dispatch(removeSuccess),
})
export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(LoginView)
)
