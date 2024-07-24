import { styled } from "@mui/material";

/**
 * Using a styled canvas wraps the canvas in Mui's styled component which then allows for us to use their sx styling system.
 */
export const Canvas = styled('canvas')({
	width: '2rem',
	height: '2rem',
	animation: 'rotateFullCircle 5s linear infinite alternate'
})