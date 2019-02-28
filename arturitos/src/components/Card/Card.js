import React from 'react'
import PropTypes from 'prop-types'
import './Card.scss'

const Card = ({ children, white, transparent , fullheight}) => (
	<div className={`card-container ${white?'white': null} ${transparent?'transparent': null} ${fullheight?'fullheight': null}`} >
		{children}
	</div>
)

Card.propTypes = {
	children: PropTypes.any,
        styles: PropTypes.any,
        white: PropTypes.bool,
        transparent: PropTypes.bool,
        fullheight: PropTypes.bool
}
export default Card
