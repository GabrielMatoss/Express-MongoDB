import BaseError from "./BaseError.js";

class NotFound extends BaseError {
	constructor(message = "Página não encontrada") {
		super(message, 404);
	}
}

export default NotFound;