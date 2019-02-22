/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import React from 'react'
import './BurgerIcon.scss'

export default ({ open, ...props }) => (
	<div className={open ? 'burger-menu open' : 'burger-menu'} {...props}>
		{props.goback ? (
			<i
				className="fas fa-chevron-left"
				style={{ width: '25px', fontSize: '1rem' }}
			/>
		) : (
			<React.Fragment>
				<div className="bar1" key="b1" />
				<div className="bar2" key="b2" />
				<div className="bar3" key="b3" />
			</React.Fragment>
		)}
	</div>
)
