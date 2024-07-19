'use client';

import AuthActions from "./AuthActions";
import AuthContent from "./AuthContent";
import SignInCard from "./SignInCard";
import SignUpCard from "./SignUpCard";

const { Button, DialogTitle, CardContent, CardActions, Typography, Toolbar, CardHeader, TextField, Stack } = require("@mui/material");
const { default: AuthModal } = require("./AuthModal");
const { default: Flipper } = require("./Flipper");
const { useBool } = require("@/hooks");
const { default: AuthFace } = require("./AuthFace");

const AuthCard = () => {
	const [flipped, toggle] = useBool();
	return (<AuthModal {...{flipped}}>
		<Flipper {...{flipped}}>
			<SignInCard onFlip={toggle}/>
			<SignUpCard onFlip={toggle}/>
		</Flipper>
	</AuthModal>)
}

export default AuthCard;