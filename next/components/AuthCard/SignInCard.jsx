import { Alert, Button, DialogTitle, Stack, TextField, Toolbar, Typography } from "@mui/material";
import AuthContent from "./AuthContent";
import AuthActions from "./AuthActions";
import PassField from "./PassField";
import axios from "axios";
import { useState } from "react";
import { useBool } from "@/hooks";
import LoadingIcon from "../LoadingIcon";

const { default: AuthFace } = require("./AuthFace")

const SignInCard = ({onFlip}) => {
	const [signInError,, setSignInError] = useBool();
	const [isLoading,, setIsLoading] = useBool();
	/**
	 * 
	 * @param {SubmitEvent} e 
	 */
	const onSubmit = async (e) => {
		e.preventDefault();
		const payload = {username: e.target.elements.username.value, password: e.target.elements.password.value};
		try{
			setIsLoading(true);
			const authenticated = await axios.post('/api_v1/auth', payload);
			location.href = "/";
		} catch (err) {
			console.log(err);
			setSignInError(true)
		}
		setTimeout(()=>setIsLoading(false), 3e3);
	}

	const onChange = () => setSignInError(false);
	return isLoading ? (<AuthFace>
		<Stack justifyContent="center" alignItems="center" sx={{width: '100%', height: '100%'}}>
			<LoadingIcon stroke="primary.main" sx={{
				width: "10rem",
				height: "10rem"
			}} stepSize={0.1}/>
		</Stack>
	</AuthFace>):(<AuthFace>
		<DialogTitle sx={{bgcolor: 'info.main'}}>Sign In</DialogTitle>
		<AuthContent as="form" id="sign-in" method="POST" action="/api_v1/auth" {...{onSubmit, onChange}}>
			{signInError && <Alert severity="error">Invalid username or password</Alert>}
			<TextField label="Username" name="username" autoComplete="username"/>
			<PassField label="Password" name="password" autoComplete="current-password"/>
		</AuthContent>
		<AuthActions>
			<Toolbar disableGutters>
				<Typography>Not a member? </Typography>
				<Button {...{
					"aria-label": "Sign Up",
					onClick: onFlip,
					variant: 'text'
				}}>Sign Up</Button>
			</Toolbar>
			<Button {...{
				variant: 'contained',
				type: 'submit',
				form: 'sign-in'
			}}>Sign In</Button>
		</AuthActions>
	</AuthFace>);
};

export default SignInCard;