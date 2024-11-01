import {MenuItem } from "@mui/material";
import MenuButton from "../MenuButton";
import AuthCard from "../AuthCard";

const { useAuthentication } = require("@/contexts");
const { default: LoadingIcon } = require("../LoadingIcon");

const UserMenu = () => {
	const {user, isLoading, userError, signOut} = useAuthentication();
	if(isLoading) return (<LoadingIcon {...{
		stroke: 'primary.main'
	}}/>)
	return (<>
		<MenuButton {...{
			title: user?.username ?? "Login / Sign Up",
			buttonProps: {
				color: "inherit",
				tabIndex: -1
			},
			sx:{
				'.MuiList-root':{py:0}
			},
			onClose: (e, reason) => {
				if(reason === 'tabKeyDown') return false;
				return true;
			}
		}}>
			{!!user && (<MenuItem onClick={()=>signOut()}>Sign Out</MenuItem>)}
			{!user && <AuthCard/>}
		</MenuButton>
	</>);
};

export default UserMenu;