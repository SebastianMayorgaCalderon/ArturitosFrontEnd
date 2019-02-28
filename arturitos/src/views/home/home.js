/* eslint-disable react/no-unused-state */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable prettier/prettier */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import ReactPaginate from 'react-paginate'
import {
        fetchAllStars,
        fetchAllCategories,
        fetchAllCelesialBodiesByType,
} from '../../store/actions/index'
import Card from '../../components/Card/Card'
import MyButton from '../../components/MyButton/MyButton'
import Input from '../../components/Input/Input'
import Logo from '../../assets/images/Logo.png'
import './home.scss'
import CelestialBody from '../../components/CelestialBody/CelestialBody'

class HomeView extends Component {
        state = {
                selectedType: null,
                nameToSearch: '',
                nameToSearchFieldActive: false,
        }

        componentDidMount() {
                        this.props.onFetchCategories();
                        this.props.onFetchStars({
                                pageNum: this.props.currentPage,
                                name: this.state.nameToSearch,
                                size: this.props.size,
                        })
        }

        handlePageChange = page => {
                if (this.state.selectedType) {
                        this.props.onFilterCelestialBodies({
                                type: this.state.selectedType,
                                pageNum: page.selected,
                                size: this.props.size,
                                name: this.state.nameToSearch,
                        })
                } else {
                        this.props.onFetchStars({
                                name: this.state.nameToSearch,
                                pageNum: page.selected,
                                size: this.props.size,
                        })
                }

        }

        navigateTo = id => {
                this.props.history.push(`${this.props.match.url}/${id}`)
        }

        filter = type => {
                this.setState({ selectedType: type })
                this.props.onFilterCelestialBodies({
                        type,
                        name: this.state.nameToSearch,
                        pageNum: this.props.currentPage,
                        size: this.props.size,
                })
        }



        getCategoriesButtons = () => {
                const { categories } = this.props
                return categories.map(cat => (
                        <MyButton label={cat.name} onExecFunc={() => this.filter(cat.name)} canClick key={cat.id}
                                selected={this.state.selectedType === cat.name} />
                ))
        }

        resetFilter = () => {
                this.setState({ selectedType: null, nameToSearch: '' })
                this.props.onFetchStars({
                        pageNum: this.props.currentPage,
                        size: this.props.size,
                        name: '',
                })
        }

        render() {
                const { totalPages, currentPage, bodies } = this.props
                const starToShow = bodies.map((star, i) => (
                        <CelestialBody body={star} key={i} onNavigate={this.navigateTo} />
                ))
                return (
                        <div className="home-wrapper">
                                <div className="section">
                                        <Card>
                                                <img src={Logo} className="my-logo" alt="R2Dt0s Logo" />
                                        </Card>
                                </div>

                                <div className="filter-controls__container section">
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
                                </div>
                                <div className="celestial-body-list__container section">
                                        <Card fullheight>
                                                <div className="body-list_wrapper">
                                                        <div className="body-list_wrapper">
                                                                {starToShow}
                                                        </div>
                                                        <div className="paginate-controls">
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
                                                        </div>
                                                </div>
                                        </Card>
                                </div>
                        </div>
                )
        }
}

const mapStateToProps = ({ userReducer, starsReducer }) => ({
        token: userReducer.token,
        waitingForResponse: starsReducer.waitingForResponse,
        errorMsj: starsReducer.errorMsj,
        size: starsReducer.size,
        bodies: starsReducer.bodies,
        currentPage: starsReducer.pageNumber,
        totalPages: starsReducer.totalPages,
        totalElements: starsReducer.totalElements,
        categories: starsReducer.categories
})
const mapDispatchToProps = dispatch => ({
        onFetchStars: page => dispatch(fetchAllStars(page)),
        onFetchCategories: () => dispatch(fetchAllCategories()),
        onFilterCelestialBodies: (type) => dispatch(fetchAllCelesialBodiesByType(type))
})
export default withRouter(
        connect(
                mapStateToProps,
                mapDispatchToProps
        )(HomeView)
)
