/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import Card from '../../components/Card/Card'
import './cart.scss'
import MyButton from '../../components/MyButton/MyButton'
import { removeProductFromOrder } from '../../store/actions/index'
import CelestialBody from '../../components/CelestialBody/CelestialBody'

class CartView extends Component {

  getTotalPrice = () => {
    let tot = 0;
    this.props.currentOrderProducts.forEach(product => {
      tot += parseFloat(product.price)
    })
    return tot
  }

  onCheckout = () => {
    const { token, history } = this.props
    if (token) {
      alert('ToCkeckOut')
    } else {
      history.push('/login')
    }
  }

  render() {
    const { currentOrderProducts } = this.props
    const starToShow = currentOrderProducts.map((star, i) => (
      <div className="product-item-container">
        <CelestialBody body={star} key={i} onNavigate={this.navigateTo} />
        <div className="product-details">
          <h3>Seller: {star.seller}</h3>
          <h3>Price: {star.price}$</h3>
        </div>
        <MyButton label="Remove" canClick style={{ width: '100%' }} />
      </div>

    ))
    return (
      <div className="cart-view__wrapper">
        <Card>
          <div className="cart-view__container">
            <MyButton label="Check out" canClick style={{ width: '100%' }} onExecFunc={this.onCheckout} />
            <div className="cart-view__section">
              {starToShow.length === 0 ? <h1>No products so far</h1> : starToShow}
            </div>
            {starToShow.length !== 0 ? <h1>Total: {this.getTotalPrice()}$</h1> : null}
          </div>
        </Card>
      </div>
    )
  }
}
const mapStateToProps = ({ userReducer, starsReducer, cartReducer }) => ({
  token: userReducer.token,
  currentOrderProducts: cartReducer.currentOrderProducts,
})
const mapDispatchToProps = dispatch => ({
  onRemoveProduct: id => dispatch(removeProductFromOrder(id)),
})
export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(CartView)
)
