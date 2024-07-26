/*
This file will be used to reduce redundant code when interacting with an html form.

Using the form to manage state can be usefull when handling a large number of inputs.
*/

/**
 * Grabs the values.
 * 
 * currently this method does not handle arrays because there is no need.
 * @param {SubmitEvent<HTMLFormElement>} e 
 * @returns {Record<string, any>}
 */
export const formValues = e => {
	var vals = {}
	for (const el of e.target.elements) {
		if(!el.name) continue;
		vals[el.name] = el.value;
	}
	return vals
}