import { model, Schema } from "mongoose";

const ticketSchema = new Schema(
	{
		code: {
			type: String,
			unique: true,
			required: true,
		},
		amount: {
			type: Number,
			required: true,
		},
		purchaser: {
			type: String,
			required: true,
			index: true,
		},
	},
	{ timestamps: true }
);

export const ticketModel = model("tickets", ticketSchema);
