import book from "../models/Book.js"

class BookController {

    static async listBooks (req, res) {
        try {
            const bookList = await book.find({});
            res.status(200).json(bookList);            
        } catch (error) {
            res.status(500).json({ message: `${error.message} - request failure` });
        }
    };
    
    static async listBooksById (req, res) {
        try {
            const id = req.params.id;
            const bookFound = await book.findById(id);
            res.status(200).json(bookFound);            
        } catch (error) {
            res.status(500).json({ message: `${error.message} - book request failure` });
        }
    };

    static async registerBook (req, res) {
        try {
            const newBook = await book.create(req.body);
            console.log(newBook);
            res.status(201).json({ message: "successfully created", book: newBook });
        } catch (error) {
            res.status(500).json({ message: `${error.message} - failure to register a new book` });
        }
    };

    static async updateBook (req, res) {
        try {
            const id = req.params.id;
            await book.findByIdAndUpdate(id, req.body);
            res.status(200).json({ message: "updated book" });            
        } catch (error) {
            res.status(500).json({ message: `${error.message} - book update failure` });
        }
    };

    static async deleteBook (req, res) {
        try {
            const id = req.params.id;
            await book.findByIdAndDelete(id);
            res.status(200).json({ message: "book deleted successfully" });            
        } catch (error) {
            res.status(500).json({ message: `${error.message} - book delete failure` });
        }
    };
};

export default BookController;
