/* eslint-disable indent */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import BurgerIcon from '../../components/BurgerIcon/BurgerIcon'
import Card from '../../components/Card/Card'
import MyButton from '../../components/MyButton/MyButton'

import './celestial-body.scss'
import { fetchCelestialBody, addProductToOrder } from '../../store/actions'
import Spinner from '../../components/Spinner/Spinner'

class CelestialBodyDetailsView extends Component {
  componentDidMount() {
    const { id } = this.props.match.params
    this.props.onFetchCelestialBody(id)
  }

  onGoBack = () => {
    this.props.history.goBack()
  }

  onAddToCart = () => {
    this.props.onAddProduct(this.props.selectedBody)
  }

  checkIfProductOnOrder = () =>
    this.props.currentOrderProducts.find(
      product => product.id === this.props.selectedBody.id
    )

  render() {
    const { selectedBody, waitingForResponce } = this.props
    return (
      <div className="celestial-body__wrapper">
        <Card>
          {waitingForResponce || !selectedBody ? (
            <Spinner />
          ) : (
            <div className="celestial-body__wrapper__container">
              <div className="celestial-body__container">
                <img
                  className="celestial-body__image"
                  src={selectedBody.productImages[0].imageUrl}
                  alt={selectedBody.productImages[0].imageDescription}
                />
              </div>
              <div className="celestial-body__container celestial-body__details__container">
                <h1>{selectedBody.productName}</h1>
                <h2>Seller: {selectedBody.seller}</h2>
                <h3>Price: {selectedBody.price}$</h3>
                <p>{selectedBody.description}</p>

                <div className="divider" />
                {this.checkIfProductOnOrder() ? (
                  <MyButton label="Remove from cart" />
                ) : (
                  <MyButton
                    label="Add to cart"
                    canClick
                    onExecFunc={this.onAddToCart}
                  />
                )}
              </div>
            </div>
          )}
        </Card>
        <BurgerIcon
          open
          style={{ left: '2rem' }}
          goback
          onClick={() => this.onGoBack()}
        />
      </div>
    )
  }
}
const mapStateToProps = ({ userReducer, starsReducer, cartReducer }) => ({
  selectedBody: starsReducer.selectedBody,
  waitingForResponce: starsReducer.waitingForResponce,
  errorMsj: starsReducer.errorMsj,
  currentOrderProducts: cartReducer.currentOrderProducts,
})
const mapDispatchToProps = dispatch => ({
  onFetchCelestialBody: id => dispatch(fetchCelestialBody(id)),
  onAddProduct: product => dispatch(addProductToOrder(product)),
})
export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(CelestialBodyDetailsView)
)
