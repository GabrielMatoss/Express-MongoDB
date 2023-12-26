import NotFound from "../errors/NotFound.js";
import { authors } from "../models/index.js";
class AuthorController {

	static async listAuthors (req, res, next) {
		try {
			const authorList = await authors.find({});
			res.status(200).json(authorList);            
		} catch (error) {
			next(error);
		}
	}
    
	static async listAuthorsById (req, res, next) {
		try {
			const id = req.params.id;
			const authorFound = await authors.findById(id);
			
			if (authorFound !== null) {
				res.status(200).json(authorFound);
			} else {
				next(new NotFound("Id do autor não encontrado."));
			}

		} catch (error) {
			next(error);
		}
	}

	static async registerAuthor (req, res, next) {
		try {
			let newAuthor = new authors(req.body);
			const authorResult = await newAuthor.save(); 
			res.status(201).json(authorResult); 
		} catch (error) {
			next(error);
		}
	}

	static async updateAuthor (req, res, next) {
		try {
			const id = req.params.id;
			const authorFound = await authors.findByIdAndUpdate(id, { $set: req.body });

			if (authorFound !== null) {
				res.status(200).json({ message: "Autor atualizado." });  
			} else {
				next(new NotFound("Id do autor não encontrado."));
			}
			
		} catch (error) {
			next(error);
		}
	}

	static async deleteAuthor (req, res, next) {
		try {
			const id = req.params.id;
			const authorFound = await authors.findByIdAndDelete(id);

			if (authorFound !== null) {
				res.status(200).json({ message: "Autor excluído com sucesso." });    
			} else {
				next(new NotFound("Id do autor não encontrado."));
			}
			
		} catch (error) {
			next(error);
		}
	}
}

export default AuthorController;
