import React from "react";
import { Particles } from '@blackbox-vision/react-particles';
import { Button } from "@chakra-ui/react";
import "../src/css/css.css"
export const ParticlesComponent = () => {
	return <Particles
		className="ani"
		id="ani"
		width="100%"
		height="100vh"

		style={{
			backgroundColor: '#553C9A',

		}}
		params={{
			particles: {
				number: {
					value: 50,
				},
				size: {
					value: 3,
				},
			},
			interactivity: {
				events: {
					onhover: {
						enable: true,
						mode: 'repulse',
					},
				},
			},
		}}
	/>
}