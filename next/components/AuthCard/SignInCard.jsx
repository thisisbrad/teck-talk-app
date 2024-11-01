import { Alert, Button, DialogTitle, Stack, TextField, Toolbar, Typography } from "@mui/material";
import AuthContent from "./AuthContent";
import AuthActions from "./AuthActions";
import PassField from "./PassField";
import { useBool } from "@/hooks";
import LoadingIcon from "../LoadingIcon";
import { formValues, signIn } from "@/utilities";
import { useAuthentication } from "@/contexts";

const { default: AuthFace } = require("./AuthFace")

const SignInCard = ({onFlip}) => {
	const { signIn, userError, setAsync, isLoading } = useAuthentication();
	/**
	 * 
	 * @param {SubmitEvent} e 
	 */
	const onSubmit = async (e) => {
		e.preventDefault();
		const {username, password} = formValues(e);
		await signIn(username, password);
	}

	const onChange = () => setAsync(a=>({...a, error: undefined}))
	const onKeyDown = (e) => {
		e.stopPropagation();
	}
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
			{!!userError && <Alert severity="error">Invalid username or password</Alert>}
			<TextField label="Username" name="username" autoComplete="username" tabIndex={1} onKeyDown={onKeyDown}/>
			<PassField label="Password" name="password" autoComplete="current-password" tabIndex={2} onKeyDown={onKeyDown}/>
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