import BaseError from "./BaseError.js";

class NotFound extends BaseError {
	constructor(message = "page not found") {
		super(message, 404);
	}
}

export default NotFound;