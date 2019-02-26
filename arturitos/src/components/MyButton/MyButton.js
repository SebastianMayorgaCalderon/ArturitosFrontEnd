/* eslint-disable prettier/prettier */
import React from 'react'
import PropTypes from 'prop-types'

import './MyButton.scss'

const MyButton = ({ onExecFunc, canClick, label, selected, ...props }) => (
	<button
		onClick={onExecFunc}
		className={`my-button ${canClick && !selected ? 'clickable' : null} ${selected ? 'selected' : null}`}
		type="button"
		disabled={!canClick}
		{...props}
	>
		{label}
	</button>
)

MyButton.propTypes = {
	onExecFunc: PropTypes.any,
	canClick: PropTypes.bool,
	label: PropTypes.string,
	selected: PropTypes.bool,
}

export default MyButton
