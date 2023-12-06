import express from "express";
import connectToDataBase from "./config/dbConnect.js";
import book from "./models/Book.js";

const objconnection = await connectToDataBase();

objconnection.on("error", (erro) => {
    console.error("Erro de conexão", erro);
});

objconnection.once("open", () => {
    console.log("Connection to the database successful");
});

const app = express();
app.use(express.json());


app.get("/", (req, res) => {
    res.status(200).send("Curso de Node.JS");
});

app.get("/books", async(req, res) => {
    const bookList = await book.find({});
    res.status(200).json(bookList);
});

app.get("/books/:id", (req, res) => {
    const index = searchBook(req.params.id);
    res.status(200).json(books[index]);
});

app.post("/books", (req, res) => {
    books.push(req.body);
    res.status(201).send("Livro cadastrado com sucesso!");
});

app.put("/books/:id", (req, res) => {
    const index = searchBook(req.params.id);
    books[index].title = req.body.title;
    res.status(200).json(books) 
});

app.delete("/books/:id", (req, res) => {
    const index = searchBook(req.params.id);
    books.splice(index, 1);
    res.status(200).send("Livro removido com sucesso!");
});

export default app;

