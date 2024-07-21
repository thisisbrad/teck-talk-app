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
		return request.login(user, err=>{
			if(err) throw err; //just pass it up to the catch
			return response
			.status(201)
			.json({
				username:user.username, 
				firstName:user.firstName, 
				lastName: user.lastName
			});
		});
	} catch (e) {
		if(e.name === "ValidationError") return next(ApiError.fromError(422, e));
		return next(ApiError.fromError(500, e));
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
export const signedIn = ({user:{username, firstName, lastName}}, response) => {
	//this will only occur if a authentication exists.
	return response
	.status(200)
	.json({username, firstName, lastName});
}

export const info = ({user}, res) => user 
? res
.status(200)
.json(user)
: res
.status(204)
.send();