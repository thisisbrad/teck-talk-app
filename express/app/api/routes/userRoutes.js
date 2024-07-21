import { Router } from "express";
import { createUser, deleteUser, readAllUsers, readUser, updateUser } from "../controllers/userController.js";
import { authorizer, ADMIN_ROLE } from "../middleware/authorizer.js";

const router = Router();


/**
 * POST /api_v1/users
 * @summary Creates a new user (This is only accessible by an admin)
 * @tags Users v1 - Must be admin
 * @security UserAuth
 * @param {NewUser} request.body.required - The user record to be added
 * @return {User} 201 - The user record created
 * @return {ErrorMessage} 422 - Validation Error
 * @return {ErrorMessage} 500 - Internal Server Error
 */
router.post("/", authorizer(ADMIN_ROLE), createUser);

/**
 * GET /api_v1/users
 * @summary Fetches a list of all users (This is only accessible by an admin)
 * @tags Users v1 
 * @security UserAuth
 * @return {User[]} 201 - A list of users
 * @return {ErrorMessage} 500 - Internal Server Error
 */
router.get("/", authorizer(ADMIN_ROLE) , readAllUsers);

/**
 * GET /api_v1/users/{id}
 * @summary Fetches a specific user
 * @tags Users v1
 * @security UserAuth
 * @param {string} id.path.requred
 * @return {User} 200 - The user that was located
 * @return {ErrorMessage} 404 - User Not Found
 * @return {ErrorMessage} 500 - Internal Server Errror
 */
router.get("/:id", authorizer(ADMIN_ROLE), readUser);

/**
 * PUT /api_v1/users/{id}
 * @summary Update a specific user
 * @tags Users v1
 * @security UserAuth
 * @param {string} id.path.required
 * @param {User} req.body.required
 * @return {User} 200 - The user was updated
 * @return {ErrorMessage} 404 - User Not Found
 * @return {ErrorMessage} 422 - Validation Error
 * @return {ErrorMessage} 500 - Internal Server Error
 */
router.put("/:id", authorizer(ADMIN_ROLE), updateUser);

/**
 * DELETE /api_v1/users/{id}
 * @summary Delete a specific user
 * @tags Users v1
 * @security UserAuth
 * @param {string} id.path.requrired
 * @return {NoContent} 204 - User was deleted if pressent
 * @return {ErrorMessage} 500 - Internal Server Error
 */
router.delete("/:id", authorizer(ADMIN_ROLE), deleteUser);

export default router;