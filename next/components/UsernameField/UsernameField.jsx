'use client';
import { Clear, Done } from "@mui/icons-material";
import { InputAdornment, TextField } from "@mui/material"
import { useCallback, useRef, useState } from "react";
import LoadingIcon from "../LoadingIcon";
import { checkUsername } from "@/utilities";

/**
 * The point of this is to create a "stateless" input that specializes in validating a username
 * 
 * I say "stateless" because this component should not directly track the value however does have state to track error messages and Icon selection.
 * @param {*} param0 
 * @returns 
 */
const UsernameField = ({...props}) => {
	const timer = useRef();
	const [isLoading, setIsLoading] = useState(false);
	//actually using 3 values here undefined | false | true with two being falsy
	const [isValid, setIsValid] = useState();
	const [helperText, setHelperText] = useState("")

	const validateUsername = useCallback((username)=>{
		if(!username.trim()) {
			setIsValid(undefined);
			setHelperText("");
			setIsLoading(false);
			return;
		}
		const isValid = /\s{1,}/g.test(username);
		if(isValid){
			setIsValid(false);
			setHelperText("Illegal characters in username");
			setIsLoading(false);
			return;
		}
		const req = checkUsername(username);
		req.then(d=>{
			if(d) {
				setIsValid(true);
				
				setHelperText("Username is available");
			} else {
				setIsValid(false);
				setHelperText("Username is not available");
			}
			setIsLoading(false);
		})
	}, []);

	const onKeyDown = e => {
		//Dont let the previous request be fired
		if(timer.current) clearTimeout(timer.current);
		setIsLoading(true);
		setHelperText("Once your done typing I'll check if this name is available")
		setIsValid(false);
		timer.current = setTimeout(()=>{
			timer.current = null;
			setHelperText("Checking if the username is available " + e.target.value)
			validateUsername(e.target.value);
			setIsLoading(false);
		}, 1e3);
	};

	return (<TextField {...{
		...props,
		onKeyDown,
		helperText,
		error: isValid === false && !isLoading ,
		InputProps:{
			endAdornment:(<InputAdornment sx={{
				height: '100%',
				borderLeft: theme=>`1px solid ${isLoading ? theme.palette.primary.main:isValid !== false ? theme.palette.divider:theme.palette.error.main}`,
				paddingLeft: '0.75rem'
			}}>
				{isLoading ? <LoadingIcon {...{
					stroke: 'primary.main',
					maxSides: 6,
					minSides: 2,
					strokeWidth: 40,
					stepSize: 0.1
				}}/>:isValid ? <Done color="success"/>:<Clear color="error"/>}
			</InputAdornment>)
		}
	}}/>);
};

export default UsernameField;