import express from "express";
import BookController from "../controllers/bookController.js";
import paginate from "../middlewares/paginate.js";

const routes = express.Router();

routes.get("/books", BookController.listBooks, paginate);
routes.get("/books/search", BookController.listBookByFilter, paginate);
routes.get("/books/:id", BookController.listBooksById);
routes.post("/books", BookController.registerBook);
routes.put("/books/:id", BookController.updateBook);
routes.delete("/books/:id", BookController.deleteBook);

export default routes;
