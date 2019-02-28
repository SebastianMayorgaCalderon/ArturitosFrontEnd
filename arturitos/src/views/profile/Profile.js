import React, { Component } from 'react'
import Card from '../../components/Card/Card'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import ReactPaginate from 'react-paginate'
import './Profile.scss'
import CelestialBody from '../../components/CelestialBody/CelestialBody';
import MyButton from '../../components/MyButton/MyButton';
import Input from '../../components/Input/Input';
import {
        fetchUserBodies,
        fetchAllCategories,
        fetchCards,
        addCard,
        removeCard
} from '../../store/actions/index'
import StripeCheckout from 'react-stripe-checkout'

import CardList from '../../components/CardList/CardList';

class Profile extends Component {
        state = {
                selectedType: null,
                nameToSearch: '',
                nameToSearchFieldActive: false,
        }
        navigateTo = id => {
                this.props.history.push(`home/${id}`)
        }

        componentDidMount() {
                this.props.onFetchCategories();
                this.props.onFetchUserBodies({
                        pageNum: this.props.currentPage,
                        size: this.props.size,
                        name: this.state.nameToSearch,
                        type: this.state.selectedType,
                        token: this.props.token
                })
                this.props.onFetchCards(this.props.token)
        }

        onRemoveCard = id=>{
                this.props.onRemoveCard({id,token:this.props.token})
        }

        filter = type => {
                this.setState({ selectedType: type })
                this.props.onFetchUserBodies({
                        type,
                        name: this.state.nameToSearch,
                        pageNum: this.props.currentPage,
                        size: this.props.size,
                        token: this.props.token
                })
        }

        resetFilter = () => {
                this.setState({ selectedType: null, nameToSearch: '' })
                this.props.onFetchUserBodies({
                        pageNum: this.props.currentPage,
                        size: this.props.size,
                        name: '',
                        token: this.props.token
                })
        }

        getCategoriesButtons = () => {
                const { categories } = this.props
                return categories.map(cat => (
                        <MyButton label={cat.name} onExecFunc={() => this.filter(cat.name)} canClick key={cat.id}
                                selected={this.state.selectedType === cat.name} />
                ))
        }
        onAddNewCard = (value) => {     
                const card = {
                        token: value.id,
                        brand: value.card.brand,
                        lastDigits: value.card.last4
                }
                this.props.onAddCard({card, token: this.props.token})
        }  

        render() {
                const { totalPages, currentPage, bodies } = this.props
                const starToShow = bodies.map((star, i) => (
                        <CelestialBody body={star} key={i} onNavigate={this.navigateTo} />
                ))
                return (
                        <div className="profile-wrapper">
                                <div className="profile-info-container">
                                        <Card fullheight>
                                                <div className="info">
                                                        <h1 className="title">My collection</h1>
                                                        <div className="info-wrapper">
                                                                <section className="bodies-section">
                                                                        <div className="profile-filter-controls__container">
                                                                                <div className="filter-buttons__wrapper">
                                                                                        {this.getCategoriesButtons()}
                                                                                        <MyButton label="All" onExecFunc={this.resetFilter} canClick selected={!this.state.selectedType} />
                                                                                </div>
                                                                                <div className="filter-input__wapper">
                                                                                        <Input
                                                                                                type="text"
                                                                                                label="Name"
                                                                                                onChange={val => this.setState({ nameToSearch: val })}
                                                                                                value={this.state.nameToSearch}
                                                                                                active={this.state.nameToSearchFieldActive}
                                                                                                changeFieldStatus={status =>
                                                                                                        this.setState({ nameToSearchFieldActive: status })
                                                                                                }
                                                                                                locked={false}
                                                                                        />
                                                                                        <MyButton
                                                                                                label="Search"
                                                                                                onExecFunc={() => this.handlePageChange(currentPage)}
                                                                                                canClick
                                                                                        />
                                                                                </div>
                                                                                <div className="divider" />
                                                                                <div className="celestial-body-list__container profile-section">
                                                                                        <Card fullheight>
                                                                                                <div className="body-list_wrapper">
                                                                                                        <div className="body-list_wrapper">
                                                                                                                {starToShow}
                                                                                                        </div>
                                                                                                        <div className="paginate-controls">
                                                                                                                {bodies.length !== 0 ?
                                                                                                                        <ReactPaginate
                                                                                                                                previousLabel={<i className="fas fa-chevron-left" />}
                                                                                                                                pageRangeDisplayed={1}
                                                                                                                                marginPagesDisplayed={1}
                                                                                                                                breakLabel="..."
                                                                                                                                breakLinkClassName="list-products__paginate-button"
                                                                                                                                previousLinkClassName="list-products__arrow list-products__arrow--previous"
                                                                                                                                nextLinkClassName="list-products__arrow list-products__arrow--next"
                                                                                                                                nextLabel={<i className="fas fa-chevron-right" />}
                                                                                                                                pageCount={totalPages}
                                                                                                                                initialPage={currentPage}
                                                                                                                                pageLinkClassName="pagination-controls__item"
                                                                                                                                activeLinkClassName="pagination-controls__item--activate"
                                                                                                                                onPageChange={this.handlePageChange}
                                                                                                                        />
                                                                                                                        :
                                                                                                                        <h1>No stars on your inventory</h1>
                                                                                                                }
                                                                                                        </div>
                                                                                                </div>
                                                                                        </Card>
                                                                                </div>
                                                                        </div>
                                                                </section>
                                                                <section className="cards-section profile-section">
                                                                        <h2 className="title">My cards</h2>
                                                                        <StripeCheckout
                                                                                token={this.onAddNewCard}
                                                                                stripeKey="pk_test_KzphCkXTKxJKF4vBM1pGrASb"
                                                                        >
                                                                                <MyButton canClick label="Add payment method" />
                                                                        </StripeCheckout>
                                                                        <CardList cards={this.props.cards} fullwidth dontClick  canDelete onDelete={(val)=>this.onRemoveCard(val)}/>
                                                                
                                                                </section>
                                                        </div>
                                                </div>
                                        </Card>
                                </div>
                        </div>
                )
        }
}

const mapStateToProps = ({ userReducer, starsReducer }) => ({
        waitingForResponse: userReducer.waitingForResponse,
        errorMsj: userReducer.errorMsj,
        size: userReducer.size,
        bodies: userReducer.userBodies,
        currentPage: userReducer.userBodiesCurrentPage,
        totalPages: userReducer.userBodiesCantPages,
        categories: starsReducer.categories,
        token: userReducer.token,
        cards: userReducer.cards,
})
const mapDispatchToProps = dispatch => ({
        onFetchCategories: () => dispatch(fetchAllCategories()),
        onFetchUserBodies: values => dispatch(fetchUserBodies(values)),
        onFetchCards: token => dispatch(fetchCards(token)),
        onAddCard:values=>dispatch(addCard(values)),
        onRemoveCard: values=> dispatch(removeCard(values))
})
export default withRouter(
        connect(
                mapStateToProps,
                mapDispatchToProps,
        )(Profile)
)
