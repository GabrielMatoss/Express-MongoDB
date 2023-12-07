import book from "../models/Book.js"

class BookController {

    static async listBooks (req, res) {
        try {
            const bookList = await book.find({});
            res.status(200).json(bookList);            
        } catch (error) {
            res.status(500).json({ message: `${error.message} - falha na requisição` });
        }

    }; 

};

export default BookController;