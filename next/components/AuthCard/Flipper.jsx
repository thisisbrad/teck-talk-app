const { styled } = require("@mui/material");

const Flipper = styled('div', {shouldForwardProp: prop=>prop !== 'flipped'})(({flipped=false})=>({
	position: 'relative',
	width: '100%',
	height: '100%',
	transition: 'transform 0.6s',
	transformStyle: 'preserve-3d',
	transform: `rotateY(${flipped ? 180:0}deg)`
}));

export default Flipper;