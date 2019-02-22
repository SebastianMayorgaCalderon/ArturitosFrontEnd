/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import BurgerIcon from '../../components/BurgerIcon/BurgerIcon'
import Card from '../../components/Card/Card'
import MyButton from '../../components/MyButton/MyButton'

import './celestial-body.scss'
import { fetchCelestialBody } from '../../store/actions'
import Spinner from '../../components/Spinner/Spinner'

class CelestialBodyDetailsView extends Component {
	componentDidMount() {
		const { id } = this.props.match.params
		this.props.onFetchCelestialBody(id)
	}

	onGoBack = () => {
		this.props.history.goBack()
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
								<MyButton label="Add to cart" />
								<MyButton label="Remove from cart" />
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
const mapStateToProps = ({ userReducer, starsReducer }) => ({
	selectedBody: starsReducer.selectedBody,
	waitingForResponce: starsReducer.waitingForResponce,
	errorMsj: starsReducer.errorMsj,
})
const mapDispatchToProps = dispatch => ({
	onFetchCelestialBody: id => dispatch(fetchCelestialBody(id)),
})
export default withRouter(
	connect(
		mapStateToProps,
		mapDispatchToProps
	)(CelestialBodyDetailsView)
)
