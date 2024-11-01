import { useBool } from "@/hooks";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { IconButton, InputAdornment, TextField } from "@mui/material";

const PassField = props => {
	const [showPass, toggle] = useBool();
	return (<TextField {...{
		...props, 
		type: showPass ? 'text':'password',
		InputProps: {
			endAdornment: <InputAdornment position="end">
				<IconButton onClick={toggle} tabIndex={-1}>
					{showPass ? <VisibilityOff/>:<Visibility/>}
				</IconButton>
			</InputAdornment>
		}
	}}/>);
};

export default PassField;