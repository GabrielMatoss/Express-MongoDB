import NotFound from "../errors/NotFound.js";
import book from "../models/Book.js";

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
				next(new NotFound("book id not found"));
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
				res.status(200).json({ message: "updated book" });            
			} else {
				next(new NotFound("book id not found to be updated"));
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
				res.status(200).json({ message: "book deleted successfully" });            
			} else {
				next(new NotFound("book id not found to be deleted"));
			}
		} catch (error) {
			next(error);
		}
	}

	static async listBookByPublisher (req, res, next) {
		const publishing = req.query.publishing;
		try {
			const booksByPublisher = await book.find({ publishing_company: publishing });

			if(booksByPublisher.length !== 0) {
				res.status(200).json(booksByPublisher);
			} else {
				next(new NotFound("publisher not found"));
			}
			
		} catch (error) {
			next(error);
		}
	}
}

export default BookController;
