import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import Card from '../../components/Card/Card';
import { resetStatus, makeOrder, fetchCards, addCard } from '../../store/actions/index';
import Spinner from '../../components/Spinner/Spinner';
import StripeCheckout from 'react-stripe-checkout'

import './TransactionResponse.scss'
import MyButton from '../../components/MyButton/MyButton';
import CardList from '../../components/CardList/CardList';
class TransactionResponse extends Component {
        state = {
                selectedCard: null,
                isCheckingOut: false
        }
        componentDidMount() {
                if(!this.props.token){
                        this.props.history.push('/home')
                }
                        this.props.onFetchCards(this.props.token)
        }
        onContinueCheckout = () => {
                this.setState({isCheckingOut:true})
                this.props.onMakeOrder({
                        order:{
                                products: this.props.currentOrderProducts,
                                cardToken: this.state.selectedCard
                        },
                        token:this.props.token
                })
        }

        onAddNewCard = (value) => {     
                const card = {
                        token: value.id,
                        brand: value.card.brand,
                        lastDigits: value.card.last4
                }
                this.props.onAddCard({card, token: this.props.token})
        }     
        
        selectCard = token=>{
                this.setState({selectedCard: token})
        }

        componentWillUnmount() {
                this.props.onResetStatus();
        }
        loadConfirmationView = () => {
                const { success, waitingForResponceCart } = this.props
                return (
                        <div className="response-info-wrapper">
                                {
                                        waitingForResponceCart ? (
                                                <React.Fragment>
                                                        <h1>Procesing transaction</h1>
                                                        <Spinner />
                                                </React.Fragment>
                                        )
                                                :
                                                success ? (
                                                        <React.Fragment>
                                                                <h1>Your order has been processed</h1>
                                                                <MyButton canClick label="OK" style={{ width: '25%' }} onExecFunc={()=>this.props.history.push('/my-profile')} />
                                                        </React.Fragment>
                                                ) :
                                                        (
                                                                <React.Fragment>
                                                                        <h1>There was an error Try again later</h1>
                                                                        <MyButton canClick label="Go Back" onExecFunc = {()=>this.props.history.push('/home')} />
                                                                </React.Fragment>
                                                        )
                                }

                        </div>
                )
        }
        getCardList = () => {
                if (this.props.waitingForResponseUser) {
                        return <Spinner />
                } else if (this.props.cards.length === 0) {
                        return (
                                <div className="info">
                                        <h1>Add peymant method</h1>
                                        <StripeCheckout
                                                token={this.onAddNewCard}
                                                stripeKey="pk_test_KzphCkXTKxJKF4vBM1pGrASb"
                                        >
                                                <MyButton canClick label="Add payment method" />
                                        </StripeCheckout>
                                </div>)
                } else {
                        return (
                                <div className="info">
                                        <h1>Choose the payment method</h1>
                                        <CardList cards={this.props.cards} onSelected={this.selectCard}selectedCardToken = {this.state.selectedCard} canClick />
                                        <MyButton label="continue" canClick = {this.state.selectedCard!==null} onExecFunc={this.onContinueCheckout}/>
                                </div>
                        )
                }

        }
        render() {

                return (
                        <div className="response-view-wrapper">
                                <div className="response-container">
                                        <Card>
                                                {!this.state.isCheckingOut?this.getCardList():this.loadConfirmationView()}
                                        </Card>
                                </div>
                        </div>
                )
        }
}

const mapStateToProps = ({ userReducer, cartReducer }) => ({
        token: userReducer.token,
        currentOrderProducts: cartReducer.currentOrderProducts,
        waitingForResponceCart: cartReducer.waitingForResponce,
        waitingForResponseUser: userReducer.waitingForResponce,
        cards: userReducer.cards,
        success: cartReducer.success,
        errorMsj: cartReducer.errorMsj
})
const mapDispatchToProps = dispatch => ({
        onResetStatus: () => dispatch(resetStatus()),
        onFetchCards: token => dispatch(fetchCards(token)),
        onMakeOrder: (values) => dispatch(makeOrder(values)),
        onAddCard:values=>dispatch(addCard(values))

})
export default withRouter(
        connect(
                mapStateToProps,
                mapDispatchToProps
        )(TransactionResponse)
)
