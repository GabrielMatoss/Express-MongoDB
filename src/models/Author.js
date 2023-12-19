import mongoose from "mongoose";

const authorSchema = new mongoose.Schema({
	id: { type: String },
	name: { type: String, required: [true, "the author name is mandatory"] },
	nationality: { type: String }
}, { versionKey: false });

const author = mongoose.model("authors", authorSchema);

export default author;