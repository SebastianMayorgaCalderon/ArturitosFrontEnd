/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import ReactPaginate from 'react-paginate'
import {
	fetchAllConstallations,
	fetchAllStarts,
} from '../../store/actions/index'
import Card from '../../components/Card/Card'
import MyButton from '../../components/MyButton/MyButton'
import Spinner from '../../components/Spinner/Spinner'
import Warning from '../../components/Warning/Warning'
import Input from '../../components/Input/Input'
import Logo from '../../assets/images/Logo.png'
import './home.scss'
import CelestialBody from '../../components/CelestialBody/CelestialBody'

class HomeView extends Component {
	state = {
		starFiltering: false,
		nameToSearch: '',
		nameToSearchFieldActive: false,
	}

	componentDidMount() {
		this.props.onFetchStars({
			pageNum: this.props.currentPage,
			size: this.props.size,
		})
	}

	handlePageChange = page => {
		this.props.onFetchStars({
			pageNum: page.selected,
			size: this.props.size,
		})
	}

	navigateTo = id => {
		this.props.history.push(`${this.props.match.url}/${id}`)
	}

	render() {
		const { totalPages, currentPage, bodys, waitingForResponse } = this.props
		const starToShow = bodys.map((star, i) => (
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
						<MyButton label="Stars" onExecFunc={this.onLoginHandler} canClick />
						<MyButton
							label="Constellations"
							onExecFunc={this.onLoginHandler}
							canClick
						/>
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
							onExecFunc={this.onLoginHandler}
							canClick
						/>
					</div>
				</div>
				<div className="celestial-body-list__container section">
					<Card>
						<div className="body-list_wrapper">
							<div className="body-list_wrapper">
								{waitingForResponse ? <Spinner /> : starToShow}
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
	bodys: starsReducer.bodys,
	currentPage: starsReducer.pageNumber,
	totalPages: starsReducer.totalPages,
	totalElements: starsReducer.totalElements,
})
const mapDispatchToProps = dispatch => ({
	onFetchStars: page => dispatch(fetchAllStarts(page)),
	onFetchConstallations: page => dispatch(fetchAllConstallations(page)),
})
export default withRouter(
	connect(
		mapStateToProps,
		mapDispatchToProps
	)(HomeView)
)
