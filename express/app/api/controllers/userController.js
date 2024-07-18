import User from '../models/User.js';
import { omit } from '../utilities';
import ApiError from '../errors/ApiError.js';

/*
# User Controller
In order to reduce redundant code these functions will not verify the user is authenticated instead a middleware will be used to do so. as such these functions assume only users that have been granted the necessary credentials can access these functions.
*/
/**
 * Creates a user 
 * 
 * ### TODO:
 * - error handling
 * 	- based on the different errors one might receive different status codes may be necessary.
 * @param {import('express').Request} request 
 * @param {import('express').Response} response 
 * @param {import('express').NextFunction} next 
 */
export const createUser = async (request, response, next) => {
	try {
		const user = await User.create(request.body);
		response
		.status(201)
		.json({message: "Created user", user: omit(user, "password")});
	} catch (e) {
		return next(new ApiError("Something went wrong and the database errors havent been documented yet. Please try again later.", 500))
	}
	

};

/**
 * Reads a user 
 * 
 * This method expects an id parameter
 * 
 * For the time being only non sensitive information should be sent to the front end. 
 * @param {import('express').Request} request 
 * @param {import('express').Response} response 
 * @param {import('express').NextFunction} next 
 */
export const readUser = async (request, response, next) => {
	const { id } = request.params;
	try{
		const user = await User.findById(id, "-password");
		if (!user) return next(new ApiError("User not found", 500));
		return response
		.status(200)
		.json(user);
	} catch (e) {
		return next(ApiError.fromError(500, e));
	}
};

/**
 * Reads all users
 * 
 * Only information such as the username first name and last name should be provided.
 * @param {import('express').Request} request 
 * @param {import('express').Response} response 
 * @param {import('express').NextFunction} next 
 */
export const readAllUsers = async (request, response, next) => {
	try{
		const users = await User.find('-password');
		return response
		.status(200)
		.json(users);
	} catch (e) {
		return next(ApiError.fromError(500, e));
	}
};

/**
 * Attempts to update a user.
 * @param {import('express').Request} request 
 * @param {import('express').Response} response 
 * @param {import('express').NextFunction} next 
 */
export const updateUser = async (request, response, next) => {
	const { id } = request.params;
	
	try{
		const updatedUser = await User.findByIdAndUpdate(id, request.body);
		if(!updatedUser) return next(new ApiError("User Not Found", 404));
		const user = omit(updateUser, "password");
		return response
		.status(201)
		.json({message: "User has been updated", user})
	} catch (e) {
		return next(ApiError.fromError(500, e)); //TODO - Error might affect status code.
	}
};

/**
 * Deletes a user
 * @param {import('express').Request} request 
 * @param {import('express').Response} response 
 * @param {import('express').NextFunction} next 
 */
export const deleteUser = async (request, response, next) => {
	const { id } = request.params;

	try{
		
		//I dont see the point in returning if the record existed prior to the delete attempt however its not hard to change
		await User.findByIdAndDelete(id);
		return response
		.status(203)
		.send(); //no content
	} catch (e) {
		return next(ApiError.fromError(500, e));
	}
};
