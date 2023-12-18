import { author } from "../models/Author.js";
import book from "../models/Book.js";

class BookController {

	static async listBooks (req, res, next) {
		try {
			const bookList = await book.find({});
			res.status(200).json(bookList);            
		} catch (error) {
			next(error);
		}
	}
    
	static async listBooksById (req, res, next) {
		try {
			const id = req.params.id;
			const bookFound = await book.findById(id);
			res.status(200).json(bookFound);            
		} catch (error) {
			next(error);
		}
	}

	static async registerBook (req, res, next) {
		const newBook = req.body;
		try {
			const authorFound = await author.findById(newBook.author);
			const completeBook = { ...newBook, author: { ...authorFound._doc }};
			const bookCreated = await book.create(completeBook);
			res.status(201).json({ message: "successfully created", book: bookCreated });
		} catch (error) {
			next(error);
		}
	}

	static async updateBook (req, res, next) {
		try {
			const id = req.params.id;
			await book.findByIdAndUpdate(id, req.body);
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
