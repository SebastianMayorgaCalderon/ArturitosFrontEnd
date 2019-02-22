import React from 'react'
import PropTypes from 'prop-types'
import './Card.scss'

const Card = ({ children, styles }) => (
	<div className="card-container" style={styles}>
		{children}
	</div>
)

Card.propTypes = {
	children: PropTypes.any,
	styles: PropTypes.any,
}
export default Card
