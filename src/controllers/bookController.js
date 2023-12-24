import NotFound from "../errors/NotFound.js";
import { book } from "../models/index.js";

class BookController {

	static async listBooks (req, res, next) {
		try {
			const bookList = await book.find()
				.populate("author")
				.exec();
			res.status(200).json(bookList);            
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
			const { publisher, title } = req.query;
			const searchQuery = {};

			if (publisher) searchQuery.publisher = publisher;
			if (title) searchQuery.title = title;

			const booksByFilter = await book.find(searchQuery);

			if(booksByFilter.length !== 0) {
				res.status(200).json(booksByFilter);
			} else {
				next(new NotFound("Editora não encontrada."));
			}
			
		} catch (error) {
			next(error);
		}
	}
}

export default BookController;
