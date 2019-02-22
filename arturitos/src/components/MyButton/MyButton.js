import React from 'react'
import PropTypes from 'prop-types'

import './MyButton.scss'

const MyButton = ({ onExecFunc, canClick, label }) => (
	<button
		onClick={onExecFunc}
		className={`my-button ${canClick ? 'clickable' : null}`}
		type="button"
		disabled={!canClick}
	>
		{label}
	</button>
)

MyButton.propTypes = {
	onExecFunc: PropTypes.any,
	canClick: PropTypes.bool,
	label: PropTypes.string,
}

export default MyButton
