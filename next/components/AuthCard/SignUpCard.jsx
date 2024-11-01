import { Alert, Box, Button, DialogTitle, InputAdornment, Stack, TextField, Toolbar, Typography } from "@mui/material";
import { Cancel, Clear, Done } from "@mui/icons-material";
import AuthContent from "./AuthContent";
import AuthActions from "./AuthActions";
import PassField from "./PassField";
import AuthFace from "./AuthFace";
import LoadingIcon from "../LoadingIcon";
import { useCallback, useRef, useState } from "react";
import { useBool } from "@/hooks";
import axios from "axios";
import { formValues, signUp } from "@/utilities";
import UsernameField from "../UsernameField";

//The amount of time between each key press that must pass without interruption to check for a valid username
const KEY_DELAY = 1e3;
const SignUpCard = ({onFlip}) => {
	const [signInError,setSignInError] = useState();
	const [isLoading,, setIsLoading] = useBool();
	/**
	 * 
	 * @param {SubmitEvent} e 
	 */
	const onSubmit = async (e) => {
		e.preventDefault();
		e.target.checkValidity();
		
		const {email, username, firstName, lastName, password, repassword} = formValues(e);
		if(password !== repassword) return setSignInError("Invalid Password");
		try{
			setIsLoading(true);
			await signUp(email, username, firstName, lastName, password);
			location.href = "/";
		} catch (err) {
			console.log(err);
			setSignInError("Failed to create user");
		}
		setIsLoading(false);
	}

	const onKeyDown = e=>e.stopPropagation();
	const onChange = (e) => setSignInError(false);


	return (<>
	{ isLoading && <AuthFace back>
		<Stack justifyContent="center" alignItems="center" sx={{width: '100%', height: '100%'}}>
			<LoadingIcon {...{
				stroke: 'primary.main',
				minSides: 2,
				maxSides: 6,
				sx:{width: '10rem', height: '10rem'}
			}}/>
		</Stack>
	</AuthFace>}<AuthFace sx={{opacity: isLoading ? 0:1, transition: 'opacity 0.25s'}} back>
		<DialogTitle sx={{bgcolor: 'info.main'}}>Sign Up</DialogTitle>
		<AuthContent as="form" {...{onSubmit, onChange, onKeyDown}} id="sign-up">
			{signInError && <Alert severity="error">There was an error creating your account</Alert>}
			<TextField label="Email" type="email" name="email" required/>
			<Stack direction="row" gap={1}>
				<TextField label="First Name" name="firstName" required fullWidth/>
				<TextField label="Last Name" name="lastName" required fullWidth/>
			</Stack>
			<UsernameField label="Username" name="username" required/>
			<Stack direction="row" gap={1}>
				<PassField label="Password" name="password" required fullWidth/>
				<PassField label="Confirm password" name="repassword" required fullWidth/>
			</Stack>
		</AuthContent>
		<AuthActions>
			<Toolbar disableGutters>
				<Typography>Already a member? </Typography>
				<Button {...{
					"aria-label": "Sign In",
					onClick: onFlip,
					variant:"text"
				}}>Sign In</Button>
			</Toolbar>
			<Button variant="contained" type="submit" form="sign-up">Sign Up</Button>
		</AuthActions>
	</AuthFace>
	</>);
};

export default SignUpCard;