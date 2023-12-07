import express from "express";
import connectToDataBase from "./config/dbConnect.js";
import routes from "./routes/index.js";

const objconnection = await connectToDataBase();

objconnection.on("error", (error) => {
    console.error("Connection error", error);
});

objconnection.once("open", () => {
    console.log("connection to the database successful");
});

const app = express();
routes(app);


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

