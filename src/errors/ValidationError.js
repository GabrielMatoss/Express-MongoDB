import BadRequest from "./BadRequest.js";

class ValidationError extends BadRequest {
	constructor(error) {
		const errorMessages = Object.values(error.errors).map(error => error.message).join("; ");
		super(`the following errors were found: ${errorMessages}`);
	}
}

export default ValidationError;