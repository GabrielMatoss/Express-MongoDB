import mongoose from "mongoose";
import autopopulate from "mongoose-autopopulate";

const bookSchema = new mongoose.Schema({
	id: { type: mongoose.Schema.Types.ObjectId },
	title: { type: String, required: [true, "O título do livro é obrigatório"] },
	publisher: {
		type: String,
		required: [true, "A editora é obrigatória"],
		enum: {
			values: ["Classics", "Casa do código", "Alura"],
			message: "A editora {VALUE} não é um valor permitido. Editoras permitidas: Classics, Casa do código, Alura."
		}
	},
	price: {
		type: Number,
		min: [10, "O preço do livro deve estar entre 10 e 5000 reais. Valor fornecido: {VALUE}"],
		max: [5000, "O preço do livro deve estar entre 10 e 5000 reais. Valor fornecido: {VALUE}"] 
	},
	pages: {
		type: Number,
		validate: {
			validator: (value) => value >= 10 && value <= 5000,
			message: "O número de páginas do livro deve estar entre 10 e 5000. Valor fornecido: {VALUE}"
		} 
	},
	author: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "authors",
		required: [true, "O(a) autor(a) é obrigatório"],
		autopopulate: { select: "name" }
	}
}, { versionKey: false });

bookSchema.plugin(autopopulate);
const book = mongoose.model("books", bookSchema);

export default book;
