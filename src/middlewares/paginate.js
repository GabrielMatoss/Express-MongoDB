import BadRequest from "../errors/BadRequest.js";

async function paginate(req, res, next) {
	try {
		let { limit = 5, page = 1, sorting = "_id:-1" } = req.query; 
		let [fieldSorting, order] = sorting.split(":");

		limit = parseInt(limit);
		page = parseInt(page);
		order = parseInt(order);

		const result = req.result;

		if (limit > 0 && page > 0) {
			const paginatedResult = await result.find()
				.sort({ [fieldSorting]: order })
				.skip((page - 1) * limit)
				.limit(limit)
				.exec();
			res.status(200).json(paginatedResult);
		} else {
			next(new BadRequest());
		}
	} catch (error) {
		next(error);
	}
}

export default paginate;