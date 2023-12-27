import NotFound from "../errors/NotFound.js";
import BadRequest from "../errors/BadRequest.js";
import { authors, book } from "../models/index.js";

class BookController {

	static async listBooks (req, res, next) {
		try {
			let { limit = 5, page = 1, sorting = "_id:-1" } = req.query; 
			let [fieldSorting, order] = sorting.split(":");

			limit = parseInt(limit);
			page = parseInt(page);
			order = parseInt(order);

			if (limit > 0 && page > 0) {
				const bookList = await book.find()
					.sort({ [fieldSorting]: order })
					.skip((page - 1) * limit)
					.limit(limit)
					.populate("author")
					.exec();
				res.status(200).json(bookList);
			} else {
				next(new BadRequest());
			}
            
		} catch (error) {
			next(error);
		}
	}
    
	static async listBooksById (req, res, next) {
		try {
			const id = req.params.id;
			const bookFound = await book.findById(id)
				.populate("author", "name")
				.exec();
			if (bookFound !== null) {
				res.status(200).json(bookFound);            
			} else {
				next(new NotFound("Id do livro não encontrado."));
			}
			
		} catch (error) {
			next(error);
		}
	}

	static async registerBook (req, res, next) {
		try {
			let newBook = new book(req.body);
			const bookResult = await newBook.save();
			res.status(201).json(bookResult);
		} catch (error) {
			next(error);
		}
	}

	static async updateBook (req, res, next) {
		try {
			const id = req.params.id;
			const bookFound = await book.findByIdAndUpdate(id, { $set: req.body });

			if (bookFound !== null) {
				res.status(200).json({ message: "Livro atualizado com sucesso" });            
			} else {
				next(new NotFound("Id do livro não encontrado."));
			}
		} catch (error) {
			next(error);
		}
	}

	static async deleteBook (req, res, next) {
		try {
			const id = req.params.id;
			const bookFound = await book.findByIdAndDelete(id);
			if (bookFound !== null) {
				res.status(200).json({ message: "Livro excluído com sucesso" });            
			} else {
				next(new NotFound("Id do livro não encontrado."));
			}
		} catch (error) {
			next(error);
		}
	}

	static async listBookByFilter (req, res, next) {
		try {
			const searchQuery = await searchProcess(req.query);

			if (searchQuery !== null) {
				const booksByFilter = await book.find(searchQuery).populate("author");				
				res.status(200).json(booksByFilter);
			} else {
				res.status(200).send([]);
			}
			
		} catch (error) {
			next(error);
		}
	}
}

async function searchProcess(params) {
	const { publisher, title, minPages, maxPages, authorName } = params;
	let search = {};

	if (publisher) search.publisher = publisher;
	if (title) search.title = { $regex: title, $options: "i" };

	if (minPages || maxPages) search.pages = {};

	if (minPages) search.pages.$gte = minPages;
	if (maxPages) search.pages.$lte = maxPages;

	if (authorName) {
		const author = await authors.findOne({ name: authorName });

		if (author !== null) {
			search.author = author._id;
		} else {
			search = null;
		}
	}

	return search;
}

export default BookController;
