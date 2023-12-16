import { author } from "../models/Author.js";
import book from "../models/Book.js";

class BookController {

	static async listBooks (req, res) {
		try {
			const bookList = await book.find({});
			res.status(200).json(bookList);            
		} catch (error) {
			res.status(500).json({ message: `${error.message} - request failure` });
		}
	}
    
	static async listBooksById (req, res) {
		try {
			const id = req.params.id;
			const bookFound = await book.findById(id);
			res.status(200).json(bookFound);            
		} catch (error) {
			res.status(500).json({ message: `${error.message} - book request failure` });
		}
	}

	static async registerBook (req, res) {
		const newBook = req.body;
		try {
			const authorFound = await author.findById(newBook.author);
			const completeBook = { ...newBook, author: { ...authorFound._doc }};
			const bookCreated = await book.create(completeBook);
			res.status(201).json({ message: "successfully created", book: bookCreated });
		} catch (error) {
			res.status(500).json({ message: `${error.message} - failure to register a new book` });
		}
	}

	static async updateBook (req, res) {
		try {
			const id = req.params.id;
			await book.findByIdAndUpdate(id, req.body);
			res.status(200).json({ message: "updated book" });            
		} catch (error) {
			res.status(500).json({ message: `${error.message} - book update failure` });
		}
	}

	static async deleteBook (req, res) {
		try {
			const id = req.params.id;
			await book.findByIdAndDelete(id);
			res.status(200).json({ message: "book deleted successfully" });            
		} catch (error) {
			res.status(500).json({ message: `${error.message} - book delete failure` });
		}
	}

	static async listBookByPublisher (req, res) {
		const publishing = req.query.publishing;
		try {
			const booksByPublisher = await book.find({ publishing_company: publishing });
			res.status(200).json(booksByPublisher);
		} catch (error) {
			res.status(500).json({ message: `${error.message} - search failure` });
		}
	}
}

export default BookController;
