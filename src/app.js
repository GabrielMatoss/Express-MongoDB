import express from "express";

const app = express();
app.use(express.json());

const books = [
    {
        id: 1,
        title: "O Senhor dos Anéis"
    },
    {
        id: 2,
        title: "O Hobbit"
    }
];

    function searchBook(id) {
        return books.findIndex((book) => {
            return book.id === Number(id);
        });
    }

app.get("/", (req, res) => {
    res.status(200).send("Curso de Node.JS");
});

app.get("/books", (req, res) => {
    res.status(200).json(books);
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

//mongodb+srv://GmAdmin:@cluster0.vyhg8fe.mongodb.net/?retryWrites=true&w=majority