import { useTheme } from "@mui/material"

export const useColor = (clr) => {
	const theme = useTheme();
	let obj = theme.palette;
	let steps = clr.split('.');
	while (steps.length) {
		let s = steps.shift();
		if(!(s in obj)) return clr;
		obj = obj[s];
	}
	return obj;
}