import mongoose from "mongoose";

const authorSchema = new mongoose.Schema({
	id: { type: String },
	name: { type: String, required: [true, "O nome do(a) autor(a) é obrigatório"] },
	nationality: { type: String }
}, { versionKey: false });

const author = mongoose.model("authors", authorSchema);

export default author;