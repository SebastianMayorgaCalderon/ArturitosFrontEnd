import React from 'react'
import Particles from 'reactparticles.js'
import './particlesBackground.scss'

const particlesOpts = {
	particles: {
		shape: {
			type: 'circles',
		},
		number: {
			value: 150,
			density: {
				enable: true,
				value_area: 800,
			},
		},
	},
}
const ParticlesBackground = () => (
	<div>
		<div className="container">
			<Particles id="your-component-particles" config="particles/space.json" />
		</div>
	</div>
)

export default ParticlesBackground
