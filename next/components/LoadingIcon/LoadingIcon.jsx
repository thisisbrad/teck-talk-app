'use client';
import { useEffect, useRef } from "react";
import { Canvas } from "./Canvas";
import { CANVAS_HEIGHT, CANVAS_WIDTH, CENTER, CIRCLE, FPS, MAX_SIDES, MIN_SIDES, RADIUS, STEP_SIZE } from "./constants";
import { useColor } from "./useColor";

/**
 * While the LoadingIconProps supports an property an mui styled component accepts as well has HTMLCanvasElement Properties the following properties are provided special support to improve the usabaility of the component.
 * @typedef {object} LoadingIconProps
 * @property {string} stroke - This can be any supported color type or using mui's color notation to traverse the palette
 */

/**
 * The loading icon is just an animation that I thought was fun to make. currently it 
 * @param {StyledComponent<MUIStyledCommonProps<Theme>, DetailedHTMLProps<CanvasHTMLAttributes<HTMLCanvasElement>, HTMLCanvasElement>, {}> & LoadingIconProps} props 
 * @returns 
 */
const LoadingIcon = ({stroke:stk='currentColor', stepSize=STEP_SIZE, ...props}) => {
	const ref = useRef();
	
	const stroke = useColor(stk);

	useEffect(()=>{
		const canvas = ref.current;
		const styles = window.getComputedStyle(canvas);
		const ctx = canvas.getContext('2d');
		let gid;
		let sides = MIN_SIDES;
		let dir = stepSize;
		let lastTime;

		const center = CENTER

		const radius = RADIUS

		canvas.width = CANVAS_WIDTH;
		canvas.height = CANVAS_HEIGHT;
		const render = (time) => {
			const delta = time-lastTime;
			if(isNaN(delta)|| delta >= FPS){
				lastTime = time;
				sides += dir;
				if(sides >= MAX_SIDES || sides <= MIN_SIDES) dir *= -1;
				ctx.clearRect(0, 0, 1000, 1000);
				const s = stroke === 'currentColor' ? styles.color:stroke;
				renderFrame(ctx, sides, s, radius, center);
			}
			gid = window.requestAnimationFrame(render);
		}

		render();
		return () => window.cancelAnimationFrame(gid);
	}, [stroke])
	return <Canvas {...{...props, ref}}/>
}

/**
 * Plots a point on the circumference of a circle. the last argument can be omitted and will be assumed to be [0,0]
 * 
 * @param {number} r 
 * @param {number} a 
 * @param {[number, number]} [center]
 * @returns {[number, number]}
 */
const plot = (r, a, [x,y]=[0,0]) => [
	r * Math.sin(a) + x,
	r * Math.cos(a) + y
]

/**
	 * Renders the frame
	 * @param {CanvasRenderingContext2D} ctx
	 * @param { number } sides
	 * @param { string } color
	 * @param { number } radius
	 * @param { [number, number] } center
	 */
const renderFrame = (ctx, sides, color, radius, center) => {
	const fsides = Math.floor(sides);
	const delta = CIRCLE/sides;
	const r = sides-fsides;
	let corners = [];
	
	ctx.strokeStyle = color;
	ctx.lineWidth = 10;
	ctx.lineCap = 'round'
	ctx.beginPath();
	for (let i = 0; i<fsides; i++){
		const angle = delta*i;
		const p = plot(radius, angle, center);
		for(let j = 0; j<corners.length; j++){
			ctx.moveTo(...p);
			ctx.lineTo(...corners[j]);
		}
		corners.push(p);
	}
	if (r) {
		const angle = delta * (sides-1);
		let p = plot(radius, angle, center);
		for(let i = 0; i<corners.length; i++){
			ctx.moveTo(...p);
			ctx.lineTo(...corners[i]);
		}
	}
	ctx.stroke();
};
export default LoadingIcon;