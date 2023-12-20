import BaseError from "./BaseError.js";

class BadRequest extends BaseError {
	constructor(message = "one or more data provided is incorrect") {
		super(message, 400);
	}
}

export default BadRequest;