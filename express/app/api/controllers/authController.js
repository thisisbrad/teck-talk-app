import ApiError from "../errors/ApiError.js";
import User from "../models/User.js"

/**
 * Validates and signs up a new user.
 * @param {*} request 
 * @param {*} response 
 * @param {*} next 
 */
export const signUp = async (request, response, next) => {
	try{
		const user = await User.create(request.body);
		console.log(user, request);
		return request.login(user, err=>{
			if(err) throw err; //just pass it up to the catch
			return next();
		});
	} catch (e) {
		console.log(e);
		return next(ApiError.fromError(400, e));
	}
}

export const signOut = async (request, response, next) => {
	try {
		await request.logout(err=>{
			if(err) throw err;
			return response.redirect("/");
		});
	} catch (e) {
		return next(ApiError.fromError(500, e));
	}
}

//eslint-disable-next-line no-unused-vars
export const signIn = (request, response, next) => {
	console.log("Signing in", request.user)
	response.status(203).send();
}

//eslint-disable-next-line no-unused-vars
export const signInFailure = (error, request, response, next) => {
	console.log("Sign In Failed");
	response.status(203).send();
}