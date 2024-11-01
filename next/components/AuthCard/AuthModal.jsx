const { styled } = require("@mui/material");

const AuthModal = styled('div', {shouldForwardProp: prop=>prop !== 'flipped'})(({flipped})=>({
	perspective: 1000,
	width: 500,
	height: flipped ? 550:400,
	transition: 'height 0.6s'
}));

export default AuthModal;