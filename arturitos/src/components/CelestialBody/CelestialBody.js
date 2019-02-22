/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react'
import PropTypes from 'prop-types'
import './CelestialBody.scss'

const CelestialBody = ({ body, onNavigate }) => (
	<div
		className="celestial-boody__wrapper"
		style={{ backgroundImage: `url('${body.productImages[0].imageUrl}')` }}
		onClick={() => onNavigate(body.id)}
	>
		<h3>{body.productName}</h3>
	</div>
)

CelestialBody.propTypes = {
	body: PropTypes.any,
	onNavigate: PropTypes.any,
}

export default CelestialBody
