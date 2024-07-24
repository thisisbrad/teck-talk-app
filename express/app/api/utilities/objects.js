/*
Just a place to do some object mutation.

ESLint does not like destructured objects to have unused properties.
*/

/**
 * Omits properties from an object.
 * 
 * This is a shallow search.
 * @param {*} obj 
 * @param  {...any} props 
 * @returns 
 */
export const omit = (obj, ...props) => Object.keys(obj).reduce((o,v)=>props.includes(v) ? o:{...o, [v]:obj[v]})