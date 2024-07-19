import { styled, Card } from "@mui/material";

const AuthFace = styled(Card, {shouldForwardProp: prop=>prop !== 'back'})(({back})=>({
	position: 'absolute',
	width: '100%',
	height: '100%',
	display: 'flex',
	flexFlow: 'column nowrap',
	backfaceVisibility: 'hidden',
	...(!!back ? {transform: `rotateY(180deg)`}:{})
}));

export default AuthFace