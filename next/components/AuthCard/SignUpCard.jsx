import { Alert, Button, DialogTitle, Stack, TextField, Toolbar, Typography } from "@mui/material";
import AuthContent from "./AuthContent";
import AuthActions from "./AuthActions";
import PassField from "./PassField";
import AuthFace from "./AuthFace";
import LoadingIcon from "../LoadingIcon";
import { useState } from "react";
import { useBool } from "@/hooks";
import axios from "axios";

const SignUpCard = ({onFlip}) => {
	const [signInError,setSignInError] = useState();
	const [isLoading,, setIsLoading] = useBool();
	/**
	 * 
	 * @param {SubmitEvent} e 
	 */
	const onSubmit = async (e) => {
		e.preventDefault();
		if(e.target.elements.password.value !== e.target.elements.repassword.value) return setSignInError("Invalid Password");
		const payload = {
			username: e.target.elements.username.value, 
			password: e.target.elements.password.value,
			firstName: e.target.elements.firstName.value,
			lastName: e.target.elements.lastName.value,
			email: e.target.elements.email.value
		};
		try{
			setIsLoading(true);
			await axios.post('/api_v1/auth/signup', payload);
			location.href = "/";
		} catch (err) {
			console.log(err);
			setSignInError("Failed to create user");
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
	</AuthFace>):(<AuthFace back>
		<DialogTitle sx={{bgcolor: 'info.main'}}>Sign Up</DialogTitle>
		<AuthContent as="form" {...{onSubmit, onChange}} id="sign-up">
			{signInError && <Alert severity="error">There was an error creating your account</Alert>}
			<TextField label="Email" type="email" name="email"/>
			<Stack direction="row" gap={1}>
				<TextField label="First Name" name="firstName" fullWidth/>
				<TextField label="Last Name" name="lastName" fullWidth/>
			</Stack>
			<TextField label="Username" name="username"/>
			<Stack direction="row" gap={1}>
				<PassField label="Password" name="password" fullWidth/>
				<PassField label="Confirm password" name="repassword" fullWidth/>
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
	</AuthFace>);
};

export default SignUpCard;