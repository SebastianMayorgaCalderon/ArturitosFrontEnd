/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react'
import PropTypes from 'prop-types'
import './Warning.scss'

const Warning = ({ message, type, dissmiss, toHide }) => (
	<div
		className={`default ${type}-W ${toHide ? 'hide' : null}`}
		onClick={() => dissmiss()}
	>
		{message}
	</div>
)

Warning.propTypes = {
	message: PropTypes.string,
	type: PropTypes.string,
	dissmiss: PropTypes.any,
	toHide: PropTypes.bool,
}

export default Warning
