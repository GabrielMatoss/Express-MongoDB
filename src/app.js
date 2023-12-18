import express from "express";
import connectToDataBase from "./config/dbConnect.js";
import routes from "./routes/index.js";
import errorHandler from "./middlewares/errorHandler.js";

const objconnection = await connectToDataBase();

objconnection.on("error", (error) => {
	console.error("Connection error", error);
});

objconnection.once("open", () => {
	console.log("connection to the database successful");
});

const app = express();
routes(app);



app.use(errorHandler);

export default app;

