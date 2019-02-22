/* eslint-disable react/destructuring-assignment */
/* eslint-disable prefer-destructuring */
/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react'
import PropTypes from 'prop-types'
import './Input.scss'

const Input = ({
	active,
	value,
	error,
	label,
	predicted,
	locked,
	changeFieldStatus,
	onChange,
	type,
}) => {
	const fieldClassName = `field ${(locked ? active : active || value) &&
		'active'} ${locked && !active && 'locked'}`
	return (
		<div className={fieldClassName}>
			{active && value && predicted && predicted.includes(value) && (
				<p className="predicted">{predicted}</p>
			)}
			<input
				id={`${label}-input`}
				type={type}
				value={value}
				placeholder={label}
				onChange={ev => onChange(ev.target.value)}
				onFocus={() => !locked && changeFieldStatus(true)}
				onBlur={() => !locked && changeFieldStatus(false)}
			/>
			<label htmlFor={`${label}-input`} className={error && 'error'}>
				{error || label}
			</label>
		</div>
	)
}

Input.propTypes = {
	locked: PropTypes.bool,
	value: PropTypes.string,
	active: PropTypes.bool,
	error: PropTypes.string,
	label: PropTypes.string,
	predicted: PropTypes.bool,
	changeFieldStatus: PropTypes.any,
	onChange: PropTypes.any,
	type: PropTypes.string,
}

export default Input
