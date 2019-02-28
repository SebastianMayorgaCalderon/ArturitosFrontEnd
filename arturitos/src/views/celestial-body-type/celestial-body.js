import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import BurgerIcon from '../../components/BurgerIcon/BurgerIcon'
import Card from '../../components/Card/Card'
import MyButton from '../../components/MyButton/MyButton'

import './celestial-body.scss'
import { fetchCelestialBody, addProductToOrder, removeProductFromOrder, deselectBody, sellStar, fetchUserBodies } from '../../store/actions'
import Spinner from '../../components/Spinner/Spinner'

class CelestialBodyDetailsView extends Component {
        componentDidMount() {
                const { id } = this.props.match.params
                this.props.onFetchCelestialBody(id)
                if (this.props.token) {
                        this.props.onFetchUserBodies({
                                pageNum: this.props.currentPage,
                                size: this.props.size,
                                name: '',
                                token: this.props.token
                        })
                }
        }


        onGoBack = () => {
                this.props.history.goBack()
                this.props.onDeselectBody()
        }

        onAddToCart = () => {
                this.props.onAddProduct(this.props.selectedBody)
        }
        resellFunction = () => {
                this.props.onSellBodie({
                        id: this.props.selectedBody.id,
                        token: this.props.token
                })
                const { id } = this.props.match.params
                this.props.onFetchCelestialBody(id)
        }

        checkIfProductOnOrder = () =>
                this.props.currentOrderProducts.find(
                        product => product.id === this.props.selectedBody.id
                )

        checkIfUserOwnsProduct = () => {
                return this.props.userBodies.find(b => b.id === this.props.selectedBody.id) ? (
                        <React.Fragment>
                                <MyButton canClick label="Resell" onExecFunc={this.resellFunction} />
                        </React.Fragment>
                ) :
                        (
                                <React.Fragment>
                                        {this.checkIfProductOnOrder() ? (
                                                <MyButton label="Remove from cart" canClick onExecFunc={() => this.props.onRemoveFromOrder(this.props.selectedBody.id)} />
                                        ) : (
                                                        <MyButton
                                                                label="Add to cart"
                                                                canClick
                                                                onExecFunc={this.onAddToCart}
                                                        />
                                                )}
                                        <MyButton canClick label="To Cart" onExecFunc={() => this.props.history.push('/my-cart')} />
                                </React.Fragment>
                        )
        }

        showPrice= ()=>{
                const { selectedBody, userBodies } = this.props
                return !userBodies.find(b => b.id === this.props.selectedBody.id) ?
                (
                        <React.Fragment>
                        <h2>Seller: {selectedBody.seller}</h2>
                        <h3>Price: ${selectedBody.price}</h3>
                </React.Fragment>
                ):null
        }

        render() {
                const { selectedBody, waitingForResponce } = this.props
                return (
                        <div className="celestial-body__wrapper">
                                <Card>
                                        {waitingForResponce || !selectedBody ? (
                                                <Spinner />
                                        ) : (
                                                        <div className="celestial-body__wrapper__container">
                                                                <div className="celestial-body__container celestial-body-img-container">
                                                                        <img
                                                                                className="celestial-body__image"
                                                                                src={selectedBody.productImages[0].imageUrl}
                                                                                alt={selectedBody.productImages[0].imageDescription}
                                                                        />
                                                                </div>
                                                                <div className="celestial-body__container celestial-body__details__container">
                                                                        <h1>{selectedBody.productName}</h1>
                                                                        {this.showPrice() }
                                                                        <p>{selectedBody.description}</p>
                                                                        <div className="divider" />
                                                                        {this.checkIfUserOwnsProduct()}
                                                                       
                                                                </div>
                                                        </div>
                                                )}
                                </Card>
                                <BurgerIcon
                                        open
                                        style={{ left: '2rem' }}
                                        goback="true"
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
        userName: userReducer.username,
        userBodies: userReducer.userBodies,
        token: userReducer.token,
        currentPage: userReducer.userBodiesCurrentPage,
        totalPages: userReducer.userBodiesCantPages,
        size: userReducer.size
})
const mapDispatchToProps = dispatch => ({
        onFetchCelestialBody: id => dispatch(fetchCelestialBody(id)),
        onAddProduct: product => dispatch(addProductToOrder(product)),
        onRemoveFromOrder: id => dispatch(removeProductFromOrder(id)),
        onDeselectBody: () => dispatch(deselectBody()),
        onFetchUserBodies: values => dispatch(fetchUserBodies(values)),
        onSellBodie: values => dispatch(sellStar(values))

})
export default withRouter(
        connect(
                mapStateToProps,
                mapDispatchToProps
        )(CelestialBodyDetailsView)
)
