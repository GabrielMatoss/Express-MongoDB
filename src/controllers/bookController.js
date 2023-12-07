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

    static async registerBook (req, res) {
        try {
            const newBook = await book.create(req.body);
            console.log(newBook);
            res.status(201).json({ message: "successfully created", book: newBook });
        } catch (error) {
            res.status(500).json({ message: `${error.message} - request failure` });
        }
    };
};

export default BookController;
