const { styled, CardContent } = require("@mui/material");

const AuthContent = styled(CardContent)({
	display: 'flex',
	flexFlow: 'column nowrap',
	justifyContent: 'center',
	gap: '1rem',
	margin: '1rem 0',
	flex: 1,
	padding: '0 0.5rem'
});

export default AuthContent;