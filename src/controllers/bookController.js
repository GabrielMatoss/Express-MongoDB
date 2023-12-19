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
			res.status(200).json(bookFound);            
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
			await book.findByIdAndUpdate(id, { $set: req.body });
			res.status(200).json({ message: "updated book" });            
		} catch (error) {
			next(error);
		}
	}

	static async deleteBook (req, res, next) {
		try {
			const id = req.params.id;
			await book.findByIdAndDelete(id);
			res.status(200).json({ message: "book deleted successfully" });            
		} catch (error) {
			next(error);
		}
	}

	static async listBookByPublisher (req, res, next) {
		const publishing = req.query.publishing;
		try {
			const booksByPublisher = await book.find({ publishing_company: publishing });
			res.status(200).json(booksByPublisher);
		} catch (error) {
			next(error);
		}
	}
}

export default BookController;
