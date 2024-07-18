class ApiError extends Error {
	constructor(message, status=500){
		super(message);
		this.status = status;
	}

	static fromError(status, error) {
		return new ApiError(error.message, status);
	}
}

export default ApiError;