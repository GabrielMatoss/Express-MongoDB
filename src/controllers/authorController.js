import { author } from "../models/Author.js";

class AuthorController {

    static async listAuthors (req, res) {
        try {
            const authorList = await author.find({});
            res.status(200).json(authorList);            
        } catch (error) {
            res.status(500).json({ message: `${error.message} - request failure` });
        }
    };
    
    static async listAuthorsById (req, res) {
        try {
            const id = req.params.id;
            const authorFound = await author.findById(id);
            res.status(200).json(authorFound);            
        } catch (error) {
            res.status(500).json({ message: `${error.message} - author not found` });
        }
    };

    static async registerAuthor (req, res) {
        try {
            const newAuthor = await author.create(req.body);
            res.status(201).json({ message: "successfully created", author: newAuthor });
        } catch (error) {
            res.status(500).json({ message: `${error.message} - failure to register a new author` });
        }
    };

    static async updateAuthor (req, res) {
        try {
            const id = req.params.id;
            await author.findByIdAndUpdate(id, req.body);
            res.status(200).json({ message: "updated author" });            
        } catch (error) {
            res.status(500).json({ message: `${error.message} - author update failure` });
        }
    };

    static async deleteAuthor (req, res) {
        try {
            const id = req.params.id;
            await author.findByIdAndDelete(id);
            res.status(200).json({ message: "author deleted successfully" });            
        } catch (error) {
            res.status(500).json({ message: `${error.message} - author delete failure` });
        }
    };
};

export default AuthorController;