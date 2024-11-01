/*
Just a place to organize api calls. This will simplify updating front end when backend has a breaking change to the api.
*/

import axios from "axios"

const axe = axios.create({
	baseURL: 'http://localhost/api_v1',
	withCredentials: true //use the browsers cookies to communicate.
});

/**
 * Attempt to sign in and create a session
 * @param {string} username 
 * @param {string} password 
 * @returns {Promise<CurrentUser>}
 */
export const signIn = (username, password) => axe.post('/auth', {username, password})
.then(res=>res.data);

/**
 * Attempt to register a new user and create a session
 * @param {string} email 
 * @param {string} username 
 * @param {string} firstName 
 * @param {string} lastName 
 * @param {string} password 
 * @returns {Promise<CurrentUser>}
 */
export const signUp = (email, username, firstName, lastName, password) => axe.post('/auth/signup', {email, username, firstName, lastName, password})
.then(res=>res.data);

/**
 * Attempt to sign out
 * @returns {Promise<void>}
 */
export const signOut = () => axe.post('/auth/signout', {})
.then(res=>res.data);

/**
 * Check if a username exists.
 * @param {string} username 
 * @returns {Promise<boolean>}
 */
export const checkUsername = (username) => axe.get('/auth/'+username)
.then(res=>res.data);

/**
 * Fetches basic info about the current user.
 * @returns {Promise<CurrentUser | undefined>}
 */
export const getUserInfo = () => axe.get('/auth')
.then(res=>res.data);