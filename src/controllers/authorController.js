import author from "../models/Author.js";
import NotFound from "../errors/NotFound.js";
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
				next(new NotFound("id author not found"));
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
			const authorFound = await author.findByIdAndUpdate(id, { $set: req.body });

			if (authorFound !== null) {
				res.status(200).json({ message: "updated author" });  
			} else {
				next(new NotFound("author id could not be found to be updated"));
			}
			
		} catch (error) {
			next(error);
		}
	}

	static async deleteAuthor (req, res, next) {
		try {
			const id = req.params.id;
			const authorFound = await author.findByIdAndDelete(id);

			if (authorFound !== null) {
				res.status(200).json({ message: "author deleted successfully" });    
			} else {
				next(new NotFound("author id could not be found to be deleted"));
			}
			
		} catch (error) {
			next(error);
		}
	}
}

export default AuthorController;
