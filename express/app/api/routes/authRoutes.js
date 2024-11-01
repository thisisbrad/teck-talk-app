import { Router } from "express";
import passport from "passport";
import { signUp, signOut, signedIn, info } from "../controllers/authController.js";
import { authorized } from "../middleware/authorizer.js";
import { checkUsername } from "../controllers/userController.js";

const router = Router();
/**
 * GET /api_v1/users/username/{username}
 * @summary Checks if a username is available for use
 * @tags Users v1 - No Login necessary
 * @param {string} username.path.required - The desired username
 * @return {boolean} 200 - A response stating if the username is available for use
 * @return {ErrorMessage} 500 - Internal Server Error
 */
router.get("/:username", checkUsername);

/**
 * GET /api_v1/auth
 * @summary This is an endpoint to get session information
 * @tags Auth v1
 * @return {CurrentUser} 200 - Current user information
 * @return 204 - No current user
 */
router.get('/', info);

/**
 * POST /api_v1/auth
 * @summary Attempts to authenticate the user and sets necessary cookie for future authentication.
 * @tags Auth v1
 * @param {AuthCredentials} request.body.requred - Credentials
 * @return {CurrentUser} 200 - Current user information 
 * @return {ErrorMessage} 401 - Authentication Error
 * @return {ErrorMessage} 500 - Internal Server Error
 */
router.post('/', passport.authenticate('local'), signedIn);

/**
 * POST /api_v1/auth/signup
 * @summary Registers a new user and sets necessary cookie for future authentication.
 * @tags Auth v1
 * @param {NewUser} request.body.required - New User
 * @return {CurrentUser} 200 - Current user information
 * @return {ErrorMessage} 422 - Validation Error
 * @return {ErrorMessage} 500 - Internal Server Error
 */
router.post('/signup', signUp);

/**
 * POST /api_v1/auth/signout
 * @summary Signs the user out and removes the expected cookie
 * @tags Auth v1
 * @security UserAuth
 * @return 204 - No Content
 * @return {ErrorMessage} 500 - Internal Server Error
 */
router.post('/signout', authorized, signOut);



export default router;