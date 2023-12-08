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

app.delete("/books/:id", (req, res) => {
    const index = searchBook(req.params.id);
    books.splice(index, 1);
    res.status(200).send("Livro removido com sucesso!");
});

export default app;

