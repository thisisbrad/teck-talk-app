/**
 * @typedef {object} NoContent
 */

/**
 * @typedef {object} ErrorMessage
 * @property {string} message
 */

/**
 * @typedef {object} AuthCredentials
 * @property {string} username
 * @property {string} password
 */

/*
Unfortunately type merging doesnt work to well so static types it is
*/

/**
 * @typedef {object} NewUser
 * @property {string} email
 * @property {string} username
 * @property {string} firstName
 * @property {string} lastName
 * @property {string} password
 */

/**
 * @typedef {object} CurrentUser
 * @property {string} username
 * @property {string} firstName
 * @property {string} lastName
 * @property {number} role
 */

/**
 * A user from the store 
 * @typedef {object} User
 * @property {string} id
 * @property {string} email
 * @property {string} username
 * @property {string} firstName
 * @property {string} lastName
 * @property {number} role
 * @property {string} dateJoined
 */

/**
 * @typedef {object} Post
 * @property {string} id
 * @property {string} title
 * @property {string} category
 * @property {string} description
 * @property {number} voteCount
 */

/**
 * @typedef {object} NewPost
 * @property {string} title
 * @property {string} [category]
 * @property {string} [description]
 * @property {number} [voteCount]
 */

