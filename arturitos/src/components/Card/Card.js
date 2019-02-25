import React from 'react'
import PropTypes from 'prop-types'
import './Card.scss'

const Card = ({ children, ...props }) => (
	<div className="card-container" {...props}>
		{children}
	</div>
)

Card.propTypes = {
	children: PropTypes.any,
	styles: PropTypes.any,
}
export default Card
