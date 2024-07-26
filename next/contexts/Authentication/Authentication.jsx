'use client'
import { useCallback, useState } from "react";
import AuthenticationContext from "./AuthenticationContext";
import { getUserInfo, signOut as tekSignOut, signIn as tekSignIn } from "@/utilities";
import { useAsync } from "@/hooks";

const Authentication = ({children}) => {
	const fetchUser = useCallback(async ()=> {
		const user = await getUserInfo();
		return user
	}, [])
	const [user, isLoading, error,, setAsync] = useAsync(fetchUser); 

	/**
	 * Signs the application out from the session
	 */
	const signOut = useCallback(async () => {
		setAsync(a=>({...a, isLoading: true}));
		try{
			await tekSignOut()
			setAsync({isLoading: false});
		} catch (error) {
			setAsync({isLoading: false, error});
		}
	}, [setAsync]);


	const signIn = useCallback(async (username, password) => {
		setAsync(a=>({...a, isLoading: true}));
		try{
			const user = await tekSignIn(username, password);
			setAsync({isLoading: false, user});
		} catch (error) {
			setAsync({isLoading: false, error});
		}
	}, [setAsync]);
	return <AuthenticationContext.Provider value={{user, isLoading, userError: error, signOut, signIn, setAsync}}>
		{children}
	</AuthenticationContext.Provider>
}

export default Authentication