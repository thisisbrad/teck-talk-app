const { AppBar, Toolbar } = require("@mui/material");

/**
 * This is just a wrapper to kind of standardize the appearance of the navigation bar on each page. 
 * 
 * @param {{
 * children?: import("react").ReactNode
 * }} props
 * @returns 
 */
const Topbar = ({children}) => (<>
<AppBar position="fixed" enableColorOnDark>
	<Toolbar {...{
		sx: {
			justifyContent: 'space-between'
		}
	}}>
		{children}
	</Toolbar>
</AppBar>
<Toolbar/>
</>);

export default Topbar;