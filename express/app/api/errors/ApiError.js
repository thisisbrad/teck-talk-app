class ApiError extends Error {
	constructor(message, status=500){
		super(message);
		this.status = status;
	}

	/**
	 * A convenience method to convert an error to an ApiError
	 * @param {number} status 
	 * @param {Error} error 
	 * @returns 
	 */
	static fromError(status, error) {
		return new ApiError(error.message, status);
	}
}

export default ApiError;