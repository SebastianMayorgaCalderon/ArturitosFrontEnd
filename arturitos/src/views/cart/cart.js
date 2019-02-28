import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import Card from '../../components/Card/Card'
import './cart.scss'
import MyButton from '../../components/MyButton/MyButton'
import { removeProductFromOrder, makeOrder } from '../../store/actions/index'
import CelestialBody from '../../components/CelestialBody/CelestialBody'
import StripeCheckout from 'react-stripe-checkout'

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
                        history.push('/check-out')
                } else {
                        history.push('/login')
                }
        }
   
        onRemoveFromOrder = id => {
                this.props.onRemoveProduct(id)
        }
        render() {
                const { currentOrderProducts } = this.props
                const starToShow = currentOrderProducts.map((star, i) => (
                        <div className="product-item-container" key={i}  >
                                <CelestialBody body={star} onNavigate={this.navigateTo} />
                                <div className="product-details">
                                        <h3>Seller: {star.seller}</h3>
                                        <h3>Price: ${star.price}</h3>
                                </div>
                                <MyButton label="Remove" canClick  style={{ width: '100%' }} onExecFunc={() => this.onRemoveFromOrder(star.id)} />
                        </div>

                ))
                return (
                        <div className="cart-view__wrapper">
                                <Card>
                                        <div className="cart-view__container">
                                                <MyButton label="Checkout" canClick= {currentOrderProducts.length !==0}  style={{ width: '100%' }} onExecFunc={() => this.onCheckout()} />
                                                <div className="cart-view__section">
                                                        {starToShow.length === 0 ? <h1>No products so far</h1> : starToShow}
                                                </div>
                                                {starToShow.length !== 0 ? <h1>Total: ${this.getTotalPrice()}</h1> : null}
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
        onMakeOrder: () => dispatch(makeOrder())
})
export default withRouter(
        connect(
                mapStateToProps,
                mapDispatchToProps
        )(CartView)
)
