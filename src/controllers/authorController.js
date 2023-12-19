import author from "../models/Author.js";

class AuthorController {

	static async listAuthors (req, res, next) {
		try {
			const authorList = await author.find({});
			res.status(200).json(authorList);            
		} catch (error) {
			next(error);
		}
	}
    
	static async listAuthorsById (req, res, next) {
		try {
			const id = req.params.id;
			const authorFound = await author.findById(id);
			
			if (authorFound !== null) {
				res.status(200).json(authorFound);
			} else {
				res.status(404).json({ message: "id author not found" });
			}

		} catch (error) {
			next(error);
		}
	}

	static async registerAuthor (req, res, next) {
		try {
			let newAuthor = new author(req.body);
			const authorResult = await newAuthor.save(); 
			res.status(201).json(authorResult); 
		} catch (error) {
			next(error);
		}
	}

	static async updateAuthor (req, res, next) {
		try {
			const id = req.params.id;
			await author.findByIdAndUpdate(id, { $set: req.body });
			res.status(200).json({ message: "updated author" });            
		} catch (error) {
			next(error);
		}
	}

	static async deleteAuthor (req, res, next) {
		try {
			const id = req.params.id;
			await author.findByIdAndDelete(id);
			res.status(200).json({ message: "author deleted successfully" });            
		} catch (error) {
			next(error);
		}
	}
}

export default AuthorController;
