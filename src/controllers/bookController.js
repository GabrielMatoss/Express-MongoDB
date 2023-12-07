import book from "../models/Book.js"

class BookController {

    static async listBooks (req, res) {
        const bookList = await book.find({});
        res.status(200).json(bookList);
    }; 

};

export default BookController;