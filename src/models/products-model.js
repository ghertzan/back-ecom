import { Schema, model } from "mongoose";

const productSchema = new Schema({
	title: {
		type: String,
		minLength: [3, "Deben ser más de 3 caracteres"],
		maxLenght: [25, "Máximo 25 carecteres"],
		required: true,
	},
	description: {
		type: String,
		minLength: [3, "Deben ser más de 3 caracteres"],
		maxLenght: [50, "Máximo 50 carecteres"],
		required: true,
	},
	code: {
		type: String,
		minLength: [3, "Deben ser más de 3 caracteres"],
		maxLenght: [10, "Máximo 10 carecteres"],
		required: true,
	},
	price: {
		type: Number,
		min: [0, "No puede ser negativo"],
		required: true,
	},
	status: {
		type: Boolean,
		default: true,
	},
	stock: {
		type: Number,
		required: true,
	},
	category: {
		type: String,
		minLength: [3, "Deben ser más de 3 caracteres"],
		maxLenght: [15, "Máximo 10 carecteres"],
		required: true,
	},
	thumbnails: [String],
});

export const productModel = model("products", productSchema);
