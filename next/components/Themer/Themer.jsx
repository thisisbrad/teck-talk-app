'use client';

import { createTheme, CssBaseline, ThemeProvider, useMediaQuery } from '@mui/material';
import { useCallback, useMemo } from 'react';

/**
 * This component is reponsible for maintaining the applications theme and updating components when theme dependent properties change such as the prefered color scheme.
 * 
 * - TODO: Provide a context and method which allows for manual selection of color scheme.
 * @param {{
 * children?: import('react').ReactNode
 * }} props
 * @returns 
 */
const Themer = ({children}) => {

	//check the color scheme
	const isDark = useMediaQuery('(prefers-color-scheme:dark)');

	//convert boolean to a number
	const di = useMemo(()=>Number(isDark), [isDark]);

	/**
	 * A method to make a readable selection between different color schemed dependent values
	 * @template {T}
	 * @param {...T} vals
	 */
	const $v = useCallback((...vals)=>vals[di], [di]);

	//TODO: We need a theme!!!!
	const theme = useMemo(()=>createTheme({
		palette: {
			mode: $v('light', 'dark')
		}
	}), [$v]);

	return (<ThemeProvider {...{theme}}>
		<CssBaseline/>
		{children}
	</ThemeProvider>);
}

export default Themer;